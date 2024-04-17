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
        creationDate: new Date(Date.now()), // April 1, 2024
        description: 'Dedicate some time to volunteering for a good cause.',
        priority: 'High',
        startDate: new Date(Date.now()),
        status: 'Done',

        user,
      },
      {
        id: 20,
        title: 'Get a haircut',
        creationDate: new Date(Date.now()), // April 17, 2024 (today)
        description: 'Schedule an appointment for a haircut.',
        priority: 'Low',
        status: 'ToDo',
        startDate: new Date(Date.now()),
        user,
      },
      {
        id: 21,
        title: 'Learn a new party trick',
        creationDate: new Date(Date.now()), // April 17, 2024 (today)
        description: 'Impress your friends with a fun and unexpected skill.',
        priority: 'Low',
        startDate: new Date(Date.now()),
        status: 'InProgress',

        user,
      },
    ];
  }
  return [
    ...getTodaysTasks(),
    {
      id: 1,
      title: 'Write a blog post',
      creationDate: new Date(2024, 4, 16), // April 16, 2024
      description: 'Research and write a blog post on a chosen topic.',
      priority: 'Medium',
      startDate: new Date(2024, 4, 17), // April 17, 2024 (today)
      endDate: new Date(2024, 4, 19), // April 19, 2024
      reminder: new Date(2024, 4, 18), // April 18, 2024 (reminder for tomorrow)
      status: 'ToDo',
      user,
    },
    {
      id: 2,
      title: 'Grocery shopping',
      creationDate: new Date(2024, 4, 15), // April 15, 2024
      description: 'Buy milk, bread, vegetables, and fruits.',
      priority: 'High',
      status: 'InProgress',

      user,
    },
    {
      id: 3,
      title: 'Clean the apartment',
      creationDate: new Date(2024, 4, 12), // April 12, 2024
      description: 'Vacuum, dust, mop floors, clean bathrooms and kitchen.',
      priority: 'Low',
      endDate: new Date(2024, 4, 14), // April 14, 2024 (past due)
      status: 'Done',

      user,
    },
    {
      id: 4,
      title: 'Call dentist for appointment',
      creationDate: new Date(2024, 4, 10), // April 10, 2024
      description: 'Schedule a checkup and cleaning.',
      priority: 'Medium',
      reminder: new Date(2024, 4, 17), // April 17, 2024 (reminder for today)
      status: 'ToDo',

      user,
    },
    {
      id: 5,
      title: 'Finish reading that book',
      creationDate: new Date(2024, 3, 20), // March 20, 2024
      description: 'Read the remaining chapters of the book I started.',
      priority: 'Low',
      status: 'InProgress',

      user,
    },
    {
      id: 6,
      title: 'Exercise',
      creationDate: new Date(2024, 4, 16), // April 16, 2024
      description: 'Go for a run or do a workout routine.',
      priority: 'Medium',
      startDate: new Date(2024, 4, 17), // April 17, 2024 (today)
      reminder: new Date(2024, 4, 18), // April 18, 2024 (reminder for tomorrow)
      status: 'ToDo',

      user,
    },
    {
      id: 7,
      title: 'Pay bills',
      creationDate: new Date(2024, 4, 14), // April 14, 2024
      description: 'Pay electricity, internet, and phone bills.',
      priority: 'High',
      reminder: new Date(2024, 4, 16), // April 16, 2024 (reminder for two days ago)
      status: 'ToDo', // Could be changed to 'InProgress' if you've started paying them.

      user,
    },
    {
      id: 8,
      title: 'Learn a new skill',
      creationDate: new Date(2024, 4, 8), // April 8, 2024
      description: 'Spend some time learning a new coding language or skill.',
      priority: 'Medium',
      endDate: new Date(2024, 4, 15), // April 15, 2024 (past due)
      status: 'InProgress',

      user,
    },
    {
      id: 9,
      title: 'Plan a weekend trip',
      creationDate: new Date(2024, 4, 5), // April 5, 2024
      description: 'Research and book a weekend getaway trip.',
      priority: 'Low',
      status: 'Done',

      user,
    },
    {
      id: 10,
      title: 'Organize your workspace',
      creationDate: new Date(2024, 4, 1), // April 1, 2024
      description: 'Declutter and organize your desk or work area.',
      priority: 'Low',
      endDate: new Date(2024, 4, 3), // April 3, 2024 (past due)
      status: 'Done',

      user,
    },
    {
      id: 11,
      title: 'Meditate',
      creationDate: new Date(2024, 4, 17), // April 17, 2024 (today)
      description:
        'Spend some time meditating for mindfulness and stress relief.',
      priority: 'Low',
      startDate: new Date(2024, 4, 17), // April 17, 2024 (today)
      status: 'ToDo',

      user,
    },
    {
      id: 12,
      title: 'Write a thank-you note',
      creationDate: new Date(2024, 4, 16), // April 16, 2024
      description: 'Express gratitude to someone who helped you.',
      priority: 'Low',
      endDate: new Date(2024, 4, 18), // April 18, 2024
      status: 'ToDo',

      user,
    },
    {
      id: 13,
      title: 'Review bank statements',
      creationDate: new Date(2024, 4, 15), // April 15, 2024
      description: 'Check for any suspicious activity or errors.',
      priority: 'Medium',
      reminder: new Date(2024, 4, 19), // April 19, 2024 (reminder for two days later)
      status: 'ToDo',

      user,
    },
    {
      id: 14,
      title: 'Water the plants',
      creationDate: new Date(2024, 4, 17), // April 17, 2024 (today)
      description: 'Give your indoor and outdoor plants some water.',
      priority: 'Low',
      status: 'ToDo',

      user,
    },
    {
      id: 15,
      title: 'Learn a new recipe',
      creationDate: new Date(2024, 4, 12), // April 12, 2024
      description: 'Find a new recipe and try cooking it.',
      priority: 'Medium',
      endDate: new Date(2024, 4, 14), // April 14, 2024 (past due)
      status: 'InProgress',

      user,
    },
    {
      id: 16,
      title: 'Backup important files',
      creationDate: new Date(2024, 4, 10), // April 10, 2024
      description: 'Back up your important documents and data.',
      priority: 'High',
      reminder: new Date(2024, 4, 18), // April 18, 2024 (reminder for tomorrow)
      status: 'ToDo',

      user,
    },
    {
      id: 17,
      title: 'Organize a social event',
      creationDate: new Date(2024, 4, 8), // April 8, 2024
      description: 'Plan a get-together with friends or family.',
      priority: 'Low',
      endDate: new Date(2024, 4, 20), // April 20, 2024 (upcoming deadline)
      status: 'InProgress',

      user,
    },
    {
      id: 18,
      title: 'Clean out your inbox',
      creationDate: new Date(2024, 4, 5), // April 5, 2024
      description: 'Unsubscribe from unwanted emails and organize your inbox.',
      priority: 'Medium',
      status: 'Done',

      user,
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
    },
    {
      id: 2,
      title: 'Meeting Agenda',
      description:
        '1. Project update - Discuss progress and roadblocks. 2. Client feedback - Review client comments and action items. 3. Next steps - Determine next steps and deadlines.',
      user,
    },
    {
      id: 3,
      title: 'Book Quote',
      description:
        '"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart." - Helen Keller',
      user,
    },
    {
      id: 4,
      title: 'Movie Recommendation',
      description:
        "Highly recommend watching 'Parasite' (2019). A dark comedy thriller with a surprising twist!",
      user,
    },
    {
      id: 5,
      title: 'Learning Resource',
      description:
        'Check out this website (URL freecodecamp org) for free coding tutorials.',
      user,
    },
    {
      id: 6,
      title: 'Important Reminder',
      description: "Don't forget to pick up medication at the pharmacy today!",
      user,
    },
    {
      id: 7,
      title: 'Birthday Gift Idea',
      description:
        'Get a gift certificate for their favorite online store. Safe and convenient!',
      user,
    },
    {
      id: 8,
      title: 'Travel Itinerary',
      description:
        'Flight departs at 10:00 AM on Friday. Hotel check-in at 3:00 PM. Explore the city on Saturday and Sunday.',
      user,
    },
    {
      id: 9,
      title: 'Quote for Inspiration',
      description:
        '"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle." - Steve Jobs',
      user,
    },
    {
      id: 10,
      title: 'Recipe for Dinner',
      description:
        'Simple pasta dish: Cook pasta according to package instructions. Sauté garlic and vegetables in olive oil. Add cooked pasta and your favorite sauce. Enjoy!',
      user,
    },
  ];
}
