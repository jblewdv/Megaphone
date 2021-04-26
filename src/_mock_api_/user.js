import faker from 'faker';
import { sample } from 'lodash';
import mock from '~/utils/mock';
import { getImgCover, getImgFeed, getImgAvatar } from '~/utils/getImages';

// ----------------------------------------------------------------------

const createId = index => `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${index}`;

// ----------------------------------------------------------------------

mock.onGet('/api/user/profile').reply(() => {
  const profile = {
    id: createId(0),
    avatar: '/static/images/avatars/joshuablew.jpeg',
    name: 'Joshua Blew',
    email: 'jblew.business@gmail.com',
    integrations: [
      {
        'name': 'Google Calender',
        'events': [
          'Event Ended'
        ]
      },
      {
        'name': 'Trello',
        'events': [
          'Checklist Completed',
          'Project Goal Achieved'
        ]
      },
      {
        'name': 'Bitbucket',
        'events': [
          'Update to Master Branch',
          'Successful Build',
          'New Release'
        ]
      }
    ]
  };

  return [200, { profile }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/cards').reply(() => {
  const cards = [...Array(2)].map((card, index) => {
    return {
      id: faker.random.uuid(),
      cardNumber:
        (index === 0 && '**** **** **** 1234') ||
        (index === 1 && '**** **** **** 5678'),
      cardType: (index === 0 && 'master_card') || (index === 1 && 'visa')
    };
  });

  return [200, { cards }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/address-book').reply(() => {
  const addressBook = [...Array(4)].map((address, index) => {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      zipCode: faker.address.zipCode()
    };
  });

  return [200, { addressBook }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/invoices').reply(() => {
  const invoices = [...Array(10)].map((invoice, index) => {
    return {
      id: faker.random.uuid(),
      createdAt: faker.date.past(),
      price: faker.random.number({ min: 4, max: 99, precision: 0.01 })
    };
  });

  return [200, { invoices }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/notifications-settings').reply(() => {
  const notifications = {
    activityComments: true,
    activityAnswers: true,
    activityFollows: false,
    applicationNews: true,
    applicationProduct: false,
    applicationBlog: false
  };

  return [200, { notifications }];
});
