import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { taskAPI } from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ProfileCard from '../components/ProfileCard';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ScrollReveal from 'scrollreveal';

const Dashboard = () => {
  const { user, fetchUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, taskId: null });

  useEffect(() => {
    fetchTasks();
    fetchUser();
    
    // ScrollReveal for dashboard elements
    if (typeof window !== 'undefined' && window.ScrollReveal) {
      ScrollReveal().reveal('.dashboard-reveal', {
        distance: '30px',
        duration: 800,
        easing: 'ease-out',
        origin: 'bottom',
        interval: 100,
      });
    }
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    setDeleteConfirm({ isOpen: true, taskId: id });
  };

  const confirmDelete = async () => {
    try {
      await taskAPI.deleteTask(deleteConfirm.taskId);
      toast.success('Task deleted successfully');
      setDeleteConfirm({ isOpen: false, taskId: null });
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
      setDeleteConfirm({ isOpen: false, taskId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, taskId: null });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    fetchTasks();
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 dashboard-reveal"
        >
          <h1 className="text-5xl font-bold gradient-text mb-3">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Manage your tasks and stay productive</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="glass-effect-strong rounded-2xl p-6 dashboard-reveal card-hover group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Total Tasks</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All tasks</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="glass-effect-strong rounded-2xl p-6 dashboard-reveal card-hover group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Completed</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% done</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="glass-effect-strong rounded-2xl p-6 dashboard-reveal card-hover group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">In Progress</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Active work</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="glass-effect-strong rounded-2xl p-6 dashboard-reveal card-hover group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Pending</p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{stats.pending}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Awaiting start</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect-strong rounded-2xl p-6 mb-6 dashboard-reveal"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all shadow-sm text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-11 pr-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none appearance-none transition-all shadow-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none appearance-none transition-all shadow-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                  >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Create Task Button */}
            <motion.button
              onClick={handleCreateTask}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mb-6 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create New Task
            </motion.button>

            {/* Tasks Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect-strong rounded-2xl p-16 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No tasks found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or create a new task to get started!</p>
                <motion.button
                  onClick={handleCreateTask}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  Create Your First Task
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredTasks.map((task, index) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <TaskModal
            task={editingTask}
            onClose={handleModalClose}
            onSuccess={fetchTasks}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;

