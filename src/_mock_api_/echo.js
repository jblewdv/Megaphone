import faker from 'faker';
import { sub } from 'date-fns';
import mock from '~/utils/mock';
import { dotCase } from 'change-case';
import { sample, isEmpty, xor } from 'lodash';
import { getImgFeed, getImgAvatar } from '~/utils/getImages';

// ----------------------------------------------------------------------

const createId = index => `8864c717-587d-472a-929a-8e5f298024da-${index}`;

const CONTACT_NAMES = [
  'Parker Graham',
  'Eric Swanson',
  'Brenden Smith',
  'Greg Gibson',
  'Kelsey Houghton',
  'Sam Altman',
  'Elon Musk',
  'Peter Thiel',
  'Mark Zuckerberg'
];

const CONTACT_EMAILS = [
  'parker@finotta.com',
  'eric@finotta.com',
  'brenden@finotta.com',
  'greg@finotta.com',
  'kelsey@finotta.com',
  'sam.altman@gmail.com',
  'elon.musk@gmail.com',
  'peter.thiel@gmail.com',
  'mark.z@gmail.com'
]

const CONTACT_AVATARS = [
  '/static/images/avatars/parkergraham.png',
  '/static/images/avatars/ericswanson.jpeg',
  '/static/images/avatars/brendensmith.jpeg',
  '/static/images/avatars/greggibson.jpeg',
  '/static/images/avatars/kelseyhoughton.png',
  '/static/images/avatars/samaltman.jpeg',
  '/static/images/avatars/elonmusk.jpeg',
  '/static/images/avatars/peterthiel.jpeg',
  '/static/images/avatars/markz.jpeg'
]

const MY_CONTACT = {
  id: createId(0),
  avatar: '/static/images/avatars/joshuablew.jpeg',
  name: 'Joshua Blew',
  email: 'jblew.business@gmail.com'
};

// ----------------------------------------------------------------------

let contacts = [...Array(CONTACT_NAMES.length)].map((contact, index) => {
  const setIndex = index;
  return {
    id: createId(setIndex + 1),
    name: CONTACT_NAMES[setIndex],
    email: CONTACT_EMAILS[setIndex],
    avatar: CONTACT_AVATARS[setIndex]
  };
});

let echos = [
  {
    id: createId(1),
    name: 'Management Squad',
    description: 'Channel for keeping our team leaders up to date.',
    creator: 'You',
    integrations: ['google_calender', 'invision', 'google_docs'],
    picture: '/static/images/echoIcons/meeting.svg',
    participants: [MY_CONTACT, 
      contacts[0], 
      contacts[2]
    ],
    type: 'GROUP',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        body: 'Weekly management team meeting from 10am to 12pm',
        contentType: 'text',
        integration: '/static/images/integrations/google_calendar.png',
        createdAt: sub(new Date(), { days: 9 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name,
        hearts: 2
      },
      {
        id: 2,
        body: 'Upgraded Hubspot to Enterprise Edition',
        contentType: 'text',
        integration: '/static/images/integrations/hubspot.svg',
        createdAt: sub(new Date(), { days: 6 }),
        senderId: contacts[0].id,
        senderName: contacts[0].name,
        hearts: 1
      },
      {
        id: 3,
        body: 'Posted new Q1 leads spreadsheet',
        contentType: 'text',
        integration: '/static/images/integrations/dropbox.png',
        createdAt: sub(new Date(), { days: 2 }),
        senderId: contacts[2].id,
        senderName: contacts[2].name,
        hearts: 2
      },
      {
        id: 4,
        body: 'Updated new leads into Salesforce',
        contentType: 'text',
        integration: '/static/images/integrations/salesforce.svg',
        createdAt: sub(new Date(), { days: 2 }),
        senderId: contacts[2].id,
        senderName: contacts[2].name,
        hearts: 2
      },
      {
        id: 5,
        body: 'Updated new leads into main company Pipeline',
        contentType: 'text',
        integration: '/static/images/integrations/hubspot.svg',
        createdAt: sub(new Date(), { days: 1 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name,
        hearts: 0
      },
      {
        id: 6,
        body: 'Sales management group meeting to discuss new leads',
        contentType: 'text',
        integration: '/static/images/integrations/zoom.png',
        createdAt: sub(new Date(), { days: 1 }),
        senderId: contacts[2].id,
        senderName: contacts[2].name,
        hearts: 1
      },
      {
        id: 7,
        body: 'Sent out 1st Lead Magnet emails',
        contentType: 'text',
        integration: '/static/images/integrations/mailchimp.svg',
        createdAt: sub(new Date(), { hours: 21 }),
        senderId: contacts[0].id,
        senderName: contacts[0].name,
        hearts: 1
      },
      {
        id: 8,
        body: 'Scheduled a meeting with a new lead',
        contentType: 'text',
        integration: '/static/images/integrations/google_calendar.png',
        createdAt: sub(new Date(), { hours: 8 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name,
        hearts: 2
      },
      {
        id: 9,
        body: 'Had meeting with new lead',
        contentType: 'text',
        integration: '/static/images/integrations/zoom.png',
        createdAt: sub(new Date(), { minutes: 12 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name,
        hearts: 0
      }
      
    ]
  },
  {
    id: createId(2),
    name: '💸 Investors',
    description: 'Periodic updates for those that support us financially',
    creator: 'You',
    picture: '/static/images/echoIcons/piggy_bank.svg',
    participants: [
      MY_CONTACT,
      contacts[5],
      contacts[6],
      contacts[7],
      contacts[8]
    ],
    type: 'GROUP',
    unreadCount: 2,
    messages: [
      {
        id: 0,
        body: 'Sent investor onboarding doc',
        contentType: 'text',
        integration: '/static/images/integrations/mailchimp.svg',
        createdAt: sub(new Date(), { days: 3 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name
      },
      {
        id: 1,
        body: 'Received reply on investing agreement doc',
        contentType: 'text',
        integration: '/static/images/integrations/gmail.svg',
        createdAt: sub(new Date(), { days: 2 }),
        senderId: contacts[6].id,
        senderName: contacts[6].name
      },
      {
        id: 2,
        body: 'Received reply on investing agreement doc',
        contentType: 'text',
        integration: '/static/images/integrations/gmail.svg',
        createdAt: sub(new Date(), { days: 2 }),
        senderId: contacts[5].id,
        senderName: contacts[5].name
      },
      {
        id: 3,
        body: 'Sent followup email to investors',
        contentType: 'text',
        integration: '/static/images/integrations/mailchimp.svg',
        createdAt: sub(new Date(), { days: 1 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name
      },
      {
        id: 4,
        body: 'Received reply on investing agreement doc',
        contentType: 'text',
        integration: '/static/images/integrations/gmail.svg',
        createdAt: sub(new Date(), { hours: 6 }),
        senderId: contacts[7].id,
        senderName: contacts[7].name
      },
      {
        id: 5,
        body: 'Scheduled Q1 Investor/Shareholder meeting',
        contentType: 'text',
        integration: '/static/images/integrations/calendly.svg',
        createdAt: sub(new Date(), { hours: 4 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name
      },
      {
        id: 6,
        body: 'Created a new board called: Investor TODOs',
        contentType: 'text',
        integration: '/static/images/integrations/trello.png',
        createdAt: sub(new Date(), { minutes: 58 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name
      },
      {
        id: 7,
        body: 'Cancelled attendence to Q1 Investor/Shareholder meeting',
        contentType: 'text',
        integration: '/static/images/integrations/calendly.svg',
        createdAt: sub(new Date(), { minutes: 5 }),
        senderId: contacts[8].id,
        senderName: contacts[8].name
      }
    ]
  }, 
  {
    id: createId(3),
    name: 'Design Team',
    description: 'A place for all our devs and designers to chill',
    creator: 'Eric Swanson',
    picture: '/static/images/echoIcons/launch.svg',
    participants: [
      MY_CONTACT,
      contacts[1],
      contacts[2],
      contacts[3],
      contacts[4]
    ],
    type: 'GROUP',
    unreadCount: 5,
    messages: [
      {
        id: 1,
        body: 'Deployed v1.3.0 to production app Bank-Portal',
        contentType: 'text',
        integration: '/static/images/integrations/bitbucket.png',
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[1].id,
        senderName: contacts[1].name
      },
      {
        id: 2,
        body: 'Upgraded Dyno settings for Bank-Portal',
        contentType: 'text',
        integration: '/static/images/integrations/heroku.png',
        createdAt: sub(new Date(), { hours: 21 }),
        senderId: MY_CONTACT.id,
        senderName: MY_CONTACT.name
      },
      {
        id: 3,
        body: 'Weekly Design Thoughts meeting from 12pm-1:30pm',
        contentType: 'text',
        integration: '/static/images/integrations/zoom.png',
        createdAt: sub(new Date(), { hours: 9 }),
        senderId: contacts[3].id,
        senderName: contacts[3].name
      },
      
    ]
  }
];

// ----------------------------------------------------------------------

const findContactByEmail = email => {
  const contact = contacts.find(_contact => _contact.email === email);
  return contact || null;
};

const findContactByUsername = username => {
  const contact = contacts.find(_contact => _contact.username === username);
  return contact || null;
};

const findEchoById = echoId => {
  const echo = echos.find(
    _echoId => _echoId.id === echoId
  );
  return echo || null;
};

const findEchoByOtherParticipantId = participantId => {
  const echo = echos.find(_echo => {
    if (_echo.type !== 'ONE_TO_ONE') {
      return false;
    }
    const participant = _echo.participants.find(
      _participant => _participant.id === participantId
    );
    return !!participant;
  });
  return echo || null;
};

const findEchoByParticipantIds = participantIds => {
  const echo = echos.find(_echo => {
    if (_echo.participants.length < participantIds.length) {
      return false;
    }
    let _participantIds = [];
    _echo.participants.forEach(_participant => {
      _participantIds.push(_participant.id);
    });

    return isEmpty(xor(participantIds, _participantIds));
  });
  return echo || null;
};

// ----------------------------------------------------------------------

mock.onGet('/api/echo/getUserByEmail').reply(config => {
  try {
    const { email } = config.params;
    const results = [];
    contacts.forEach(contact => {
      if (contact.email.toLowerCase().includes(email)) {
        return results.push(contact);
      }
    });
    return [200, { results }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/echo/getMyContact').reply(config => {
  try {
    return [200, { MY_CONTACT }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/contacts').reply(200, { contacts });

// ----------------------------------------------------------------------

mock.onGet('/api/chat/search').reply(config => {
  try {
    const { query } = config.params;
    const cleanQuery = query.toLowerCase().trim();
    const results = [];
    contacts.forEach(contact => {
      if (!query) {
        return results.push(contact);
      }
      if (contact.name.toLowerCase().includes(cleanQuery)) {
        return results.push(contact);
      }
    });
    return [200, { results }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/participants').reply(config => {
  try {
    const { echoKey } = config.params;
    const participants = [];
    const echo = findEchoById(echoKey);
    if (echo) {
      participants.push(...echo.participants);
    } else {
      const contact = findContactByUsername(echoKey);
      if (contact) {
        participants.push({
          id: contact.id,
          avatar: contact.avatar,
          name: contact.name,
          email: contact.email,
        });
      }
    }
    return [200, { participants }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversations').reply(200, { echos });

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversation').reply(config => {
  try {
    const { echoKey } = config.params;
    const echo = findEchoById(echoKey);

    if (echo) {
      return [200, { echo }];
    } else {
      const contact = findContactByUsername(echoKey);
      if (!contact) {
        return [404, { message: 'Unable to find the contact' }];
      }
      const echo = findEchoByOtherParticipantId(contact.id);
      return [200, { echo }];
    }
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversation/mark-as-seen').reply(config => {
  try {
    const { echoId } = config.params;
    const echo = echos.find(
      _echo => _echo.id === echoId
    );
    if (echo) {
      echo.unreadCount = 0;
    }
    return [200, true];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/echo/new').reply(request => {
  try {
    const { newEcho } = JSON.parse(request.data);

    if (!newEcho) {
      return [400, { message: 'Invalid echo id' }];
    }

    echos.push(newEcho)

    console.log(echos)
    
    const responseData = {
      echoId: newEcho.id,
    };

    return [200, responseData];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/chat/messages/new').reply(request => {
  try {
    const { echoId, recipientIds, body } = JSON.parse(request.data);

    const user = MY_CONTACT;
    let echo = null;

    if (echoId) {
      echo = findEchoById(echoId);
      if (!echo) {
        return [400, { message: 'Invalid echo id' }];
      }
    }

    if (recipientIds) {
      const participantIds = [...recipientIds, user.id];
      echo = findEchoByParticipantIds(participantIds);
    }

    const message = {
      id: faker.random.uuid(),
      body,
      contentType: 'text',
      integration: 'none',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: user.id
    };

    if (echo) {
      echo.messages = [...echo.messages, message];
    } else {
      console.log('There is no echo with that id')
      // const participants = [user];

      // recipientIds.forEach(recipientId => {
      //   const contact = contacts.find(_contact => _contact.id === recipientId);

      //   if (!contact) {
      //     throw new Error('Contact not found');
      //   }

      //   participants.push({
      //     id: contact.id,
      //     avatar: contact.avatar,
      //     name: contact.name
      //   });
      // });

      // echo = {
      //   id: faker.random.uuid(),
      //   messages: [message],
      //   participants,
      //   type: participants.length === 2 ? 'ONE_TO_ONE' : 'GROUP',
      //   unreadCount: 0
      // };
    }

    const responseData = {
      echoId: echo.id,
      message
    };

    return [200, responseData];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
