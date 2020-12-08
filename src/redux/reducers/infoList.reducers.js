const initialState = {
  //notice
  noticeListData: [
    {
      key:'1',
      id: '001',
      // level: () => <div className="level" style={{ backgroundColor: '#f5222d' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      date: '05/10/2020',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
    },
    {
      key:'2',
      id: '002',
      // level: () => <div className="level" style={{ backgroundColor: 'green' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      date: '05/10/2020',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
    },
    {
      key:'3',
      id: '003',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      date: '05/10/2020',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
    },
    {
      key:'4',
      id: '004',
      // level: () => <div className="level" style={{ backgroundColor: 'yellow' }}></div>,
      level: 'cao',
      title: 'Tài khoản của bạn chỉ còn dưới 5000',
      date: '05/10/2020',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quo nemo totam dolore quae commodi. Aliquam quasi placeat rerum aut.',
    },
  ],
  //Transaction
  transactionsList: [
    {
      key:'1',
      no:'001',
      id:'GD10112020',
      time:'10/11/2020',
      money: '2000',
      title: 'Top Up to DSParking',
      balance:'4000',
    },
  ],
  //History
  historyList:[
    {
      key:'1',
      stt: '001',
      id:'10112020',
      date:'10/11/2020',
      place:'254 Nguyễn Văn Linh',
      timeIn:'6:45',
      timeOut:'10:05',
      licensePlates:'567 56'
    },
    {
      key:'2',
      stt: '002',
      id:'10112020',
      date:'10/11/2020',
      place:'254 Nguyễn Văn Linh',
      timeIn:'6:45',
      timeOut:'10:05',
      licensePlates:'567 56'
    },
    {
      key:'3',
      stt: '003',
      id:'10112020',
      date:'10/11/2020',
      place:'254 Nguyễn Văn Linh',
      timeIn:'6:45',
      timeOut:'10:05',
      licensePlates:'567 56'
    },
  ],
};

export default function infoListReducers(state = initialState, action) {
  switch (action.style) {
    case 'GET_NOTIFIATIONS_LIST': {
      return {
        ...state,
        noticeListData: [
          ...action.payload,
        ]
      };
    }
    case 'DELETE_NOTIFICATIONS': {
      const { id } = action.payload;
      const newNotificationListData = state.noticeListData;
      const notificationIndex = state.noticeListData.findIndex((item) => item.id === id);
      newNotificationListData.splice(notificationIndex, 1);
      return {
        ...state,
        noticeListData: [
          ...newNotificationListData,
        ],
      }
    }
    case 'GET_TRANSACTIONS_LIST':{
      return {
        ...state,
        transactionsList: [
          ...action.payload,
        ]
      };
    }
    case 'GET_HISTORY_LIST':{
      return {
        ...state,
        historyList: [
          ...action.payload,
        ]
      };
    }
    default: {
      return state;
    }
  }
}