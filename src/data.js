import { formatDate } from "./utils/utils"

const now = Date.now()

const tasks = [
	{
		id: 'task-001',
		title: 'Buy groceries',
		description: 'Pick up milk, bread, eggs, and vegetables.',
		completed: false,
		createdAt: formatDate(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
		priority: 'high',
		dueDate: null,
		tags: ['shopping', 'errand']
	},
	{
		id: 'task-002',
		title: 'Finish project proposal',
		description: 'Complete the draft and send to the team for review.',
		completed: false,
		createdAt: formatDate(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
		priority: 'low',
		dueDate: null,
		tags: ['work', 'writing']
	},
	{
		id: 'task-003',
		title: 'Call plumber',
		description: 'Schedule a visit to fix the kitchen sink leak.',
		completed: true,
		createdAt: formatDate(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
		priority: 'low',
		dueDate: null,
		tags: ['home', 'maintenance']
	},
	{
		id: 'task-004',
		title: 'Read book chapter',
		description: 'Read chapter 4 of the UX design book.',
		completed: false,
		createdAt: formatDate(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
		priority: 'medium',
		dueDate: null,
		tags: ['personal', 'learning']
	},
	{
		id: 'task-005',
		title: 'Plan weekend hike',
		description: 'Research trails and prepare gear list.',
		completed: false,
		createdAt: formatDate(now), // created now
		priority: 'medium',
		dueDate: null,
		tags: ['outdoors', 'planning']
	}
];



export default tasks;
