import { NoteEntity } from 'src/model/note.entity';
import { TaskEntity } from 'src/model/task.entity';

export const TEST_USER_LOGIN = 'val';
export const TEST_USER = {
  email: 'val@ma',
  id: 1,
  login: 'val',
  password: '$2b$10$3uieSTvgcOmN2UcV7umVyu8jLp/IGF.Vbg2gcfRJ7IpOOnCcoeFWi',
  notes: [],
  spaces: [],
  tasks: [],
};

export function getTestTasksData(user): Partial<TaskEntity>[] {
  function getTodaysTasks(): Partial<TaskEntity>[] {
    return [
      {
        id: 19,
        title: 'Volunteer for a cause you care about',
        creationDate: new Date(Date.now()),
        description: 'Dedicate some time to volunteering for a good cause.',
        priority: 'High',
        startDate: new Date(Date.now()),
        status: 'Done',
        user,
        color: generateRandomHexColor(),
      },
      {
        id: 20,
        title: 'Get a haircut',
        creationDate: new Date(Date.now()),
        description: 'Schedule an appointment for a haircut.',
        priority: 'Low',
        status: 'ToDo',
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
        user,
        color: generateRandomHexColor(),
      },
      {
        id: 21,
        title: 'Learn a new party trick',
        creationDate: new Date(Date.now()),
        description: 'Impress your friends with a fun and unexpected skill.',
        priority: 'Low',
        startDate: new Date(Date.now()),
        status: 'InProgress',
        user,
        color: generateRandomHexColor(),
      },
    ];
  }
  return [
    ...getTodaysTasks(),
    {
      id: 1,
      title: 'Write a blog post',
      creationDate: new Date(2024, 4, 16),
      description: 'Research and write a blog post on a chosen topic.',
      priority: 'Medium',
      startDate: new Date(2024, 4, 17),
      endDate: new Date(2024, 4, 19),
      reminder: new Date(2024, 4, 18),
      status: 'ToDo',
      user,
      color: generateRandomHexColor(),
    },
    {
      id: 2,
      title: 'Grocery shopping',
      creationDate: new Date(2024, 4, 15),
      description: 'Buy milk, bread, vegetables, and fruits.',
      priority: 'High',
      status: 'InProgress',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 3,
      title: 'Clean the apartment',
      creationDate: new Date(2024, 4, 12),
      description: 'Vacuum, dust, mop floors, clean bathrooms and kitchen.',
      priority: 'Low',
      endDate: new Date(2024, 4, 14),
      status: 'Done',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 4,
      title: 'Call dentist for appointment',
      creationDate: new Date(2024, 4, 10),
      description: 'Schedule a checkup and cleaning.',
      priority: 'Medium',
      reminder: new Date(2024, 4, 17),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 5,
      title: 'Finish reading that book',
      creationDate: new Date(2024, 3, 20),
      description: 'Read the remaining chapters of the book I started.',
      priority: 'Low',
      status: 'InProgress',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 6,
      title: 'Exercise',
      creationDate: new Date(2024, 4, 16),
      description: 'Go for a run or do a workout routine.',
      priority: 'Medium',
      startDate: new Date(2024, 4, 17),
      reminder: new Date(2024, 4, 18),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 7,
      title: 'Pay bills',
      creationDate: new Date(2024, 4, 14),
      description: 'Pay electricity, internet, and phone bills.',
      priority: 'High',
      reminder: new Date(2024, 4, 16),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 8,
      title: 'Learn a new skill',
      creationDate: new Date(2024, 4, 8),
      description: 'Spend some time learning a new coding language or skill.',
      priority: 'Medium',
      endDate: new Date(2024, 4, 15),
      status: 'InProgress',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 9,
      title: 'Plan a weekend trip',
      creationDate: new Date(2024, 4, 5),
      description: 'Research and book a weekend getaway trip.',
      priority: 'Low',
      status: 'Done',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 10,
      title: 'Organize your workspace',
      creationDate: new Date(2024, 4, 1),
      description: 'Declutter and organize your desk or work area.',
      priority: 'Low',
      endDate: new Date(2024, 4, 3),
      status: 'Done',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 11,
      title: 'Meditate',
      creationDate: new Date(2024, 4, 17),
      description:
        'Spend some time meditating for mindfulness and stress relief.',
      priority: 'Low',
      startDate: new Date(2024, 4, 17),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 12,
      title: 'Write a thank-you note',
      creationDate: new Date(2024, 4, 16),
      description: 'Express gratitude to someone who helped you.',
      priority: 'Low',
      endDate: new Date(2024, 4, 18),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 13,
      title: 'Review bank statements',
      creationDate: new Date(2024, 4, 15),
      description: 'Check for any suspicious activity or errors.',
      priority: 'Medium',
      reminder: new Date(2024, 4, 19),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 14,
      title: 'Water the plants',
      creationDate: new Date(2024, 4, 17),
      description: 'Give your indoor and outdoor plants some water.',
      priority: 'Low',
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 15,
      title: 'Learn a new recipe',
      creationDate: new Date(2024, 4, 12),
      description: 'Find a new recipe and try cooking it.',
      priority: 'Medium',
      endDate: new Date(2024, 4, 14),
      status: 'InProgress',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 16,
      title: 'Backup important files',
      creationDate: new Date(2024, 4, 10),
      description: 'Back up your important documents and data.',
      priority: 'High',
      reminder: new Date(2024, 4, 18),
      status: 'ToDo',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 17,
      title: 'Organize a social event',
      creationDate: new Date(2024, 4, 8),
      description: 'Plan a get-together with friends or family.',
      priority: 'Low',
      endDate: new Date(2024, 4, 20),
      status: 'InProgress',

      user,
      color: generateRandomHexColor(),
    },
    {
      id: 18,
      title: 'Clean out your inbox',
      creationDate: new Date(2024, 4, 5),
      description: 'Unsubscribe from unwanted emails and organize your inbox.',
      priority: 'Medium',
      status: 'Done',

      user,
      color: generateRandomHexColor(),
    },
  ];
}

export function getTestNotesData(user): Partial<NoteEntity>[] {
  return [
    {
      id: 1,
      title: 'Grocery List',
      description:
        'Milk, bread, eggs, vegetables (carrots, potatoes, onions), fruits (apples, oranges, bananas)',
      user,
      creationDate: new Date(2024, 2, 20),
    },
    {
      id: 2,
      title: 'Meeting Agenda',
      description:
        '1. Project update - Discuss progress and roadblocks. 2. Client feedback - Review client comments and action items. 3. Next steps - Determine next steps and deadlines.',
      user,
      creationDate: new Date(2024, 2, 16),
    },
    {
      id: 3,
      title: 'Book Quote',
      description:
        '"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart." - Helen Keller',
      user,
      creationDate: new Date(2024, 1, 3),
    },
    {
      id: 4,
      title: 'Movie Recommendation',
      description:
        "Highly recommend watching 'Parasite' (2019). A dark comedy thriller with a surprising twist!",
      user,
      creationDate: new Date(2024, 4, 1),
    },
    {
      id: 5,
      title: 'Learning Resource',
      description:
        'Check out this website (URL freecodecamp org) for free coding tutorials.',
      user,
      creationDate: new Date(2024, 5, 12),
    },
    {
      id: 6,
      title: 'Important Reminder',
      description: "Don't forget to pick up medication at the pharmacy today!",
      user,
      creationDate: new Date(2024, 2, 1),
    },
    {
      id: 7,
      title: 'Birthday Gift Idea',
      description:
        'Get a gift certificate for their favorite online store. Safe and convenient!',
      user,
      creationDate: new Date(2024, 1, 3),
    },
    {
      id: 8,
      title: 'Travel Itinerary',
      description:
        'Flight departs at 10:00 AM on Friday. Hotel check-in at 3:00 PM. Explore the city on Saturday and Sunday.',
      user,
      creationDate: new Date(2024, 4, 18),
    },
    {
      id: 9,
      title: 'Quote for Inspiration',
      description:
        '"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle." - Steve Jobs',
      user,
      creationDate: new Date(2024, 3, 17),
    },
    {
      id: 10,
      title: 'Recipe for Dinner',
      description:
        'Simple pasta dish: Cook pasta according to package instructions. Sauté garlic and vegetables in olive oil. Add cooked pasta and your favorite sauce. Enjoy!',
      user,
      creationDate: new Date(2024, 4, 8),
    },
  ];
}

function generateRandomHexColor() {
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  return hex;
}
