import React, { useState, useEffect } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import moment from 'moment';

import TopUpModal from '../../../components/TopUpModal/index'

import { FaAddressCard, FaTrashAlt, FaThumbtack, } from 'react-icons/fa';
import { Button, Form, Input, Table, Tabs } from 'antd';

import { getTransactionsList } from '../../../redux/actions';

import {
  firebaseApp,
} from '../../../configs/firebase';


function Account({
  getTransactionsList,
  transactionsList,
}) {
  const authData = JSON.parse(localStorage.getItem('authData'));
  const [isShowTopUpModal, setIsShowTopUpModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const [topUpForm] = Form.useForm();

  //Hide / Show Modal
  const handleShowTopUpModal = () => {
    setIsShowTopUpModal(true);
  }
  const handleHideTopUpModal = () => {
    setIsShowTopUpModal(false);
  }

  //Handle TopUp
  const handleTopUp = (value) => {
    const moneyValue = topUpForm.getFieldsValue();
    firebaseApp.database().ref(`/users/${authData.uid}`).once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      firebaseApp.database().ref(`/users/${authData.uid}`)
        .update({
          money: snapshotValue.money + parseFloat(moneyValue.money),
        })
    })

    firebaseApp.database().ref(`/users/${authData.uid}`).once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      firebaseApp.database().ref(`/users/${authData.uid}/transaction`)
        .push({
          time: parseFloat(moment().format('YYYYMMDDHHmm')),
          money: parseFloat(moneyValue.money),
          content: moneyValue.content,
          balance: snapshotValue.money,
        })
      setIsShowTopUpModal(false);

    })
  }

  useEffect(() => {
    firebaseApp.database().ref(`/users/${authData.uid}/transaction`).on('value', (snapshot) => {
      let snapshotTransactionValue = snapshot.val();
      let newTransactionHistory = [];
      for (let topUpId in snapshotTransactionValue) {
        newTransactionHistory = [
          {
            no: 'null',
            time: moment(snapshotTransactionValue[topUpId].time, 'YYYYMMDDHHmm').format('DD/MM/YYYY'),
            money: snapshotTransactionValue[topUpId].money,
            content: snapshotTransactionValue[topUpId].content,
            balance: snapshotTransactionValue[topUpId].balance
          },
          ...newTransactionHistory,
        ]
      }
      setTransactionHistory([...newTransactionHistory]);
    })
  }, [])

  const columns = [
    {
      title: 'Mã GD',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];
  const { TabPane } = Tabs;
  const renderTransactionList = () => {
    return transactionsList.map((item, itemIndex) => {
      return (
        <tr key={itemIndex}>
          <td>{item.no}</td>
          <td>{item.id}</td>
          <td>{item.time}</td>
          <td>{item.money}</td>
          <td>{item.title}</td>
          <td>{item.balance}</td>
          <td><FaTrashAlt /> <FaThumbtack /></td>
        </tr>
      );
    });
  }

  return (
    <div className="dsp-account">
      {/* <Card/> */}
      <div className="content-account">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tài Khoản Ngân Hàng / DSPay" key="1">
          <div className="btn-topup"><Button onClick={() => handleShowTopUpModal()}>Nạp tiền</Button></div>
            <div className="div-table">
              <Table columns={columns} dataSource={transactionHistory} pagination={{ pageSize: 6 }} />
            </div>
          </TabPane>
        </Tabs>
      </div>
      <TopUpModal
        isShowModal={isShowTopUpModal}
        handleHideModal={handleHideTopUpModal}
        handleTopUp={handleTopUp}
        topUpForm={topUpForm}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('Log: mapStateToProps -> state', state);
  const { transactionsList } = state;
  return {
    transactionsList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsList: (params) => dispatch(getTransactionsList(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);