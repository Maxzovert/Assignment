import { motion } from 'framer-motion';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="glass-effect-strong rounded-2xl p-6 dashboard-reveal sticky top-24"
    >
      <div className="text-center mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <span className="relative z-10">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
        <p className="text-sm text-gray-500 font-medium">{user.email}</p>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl hover:bg-primary-50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <span className="text-sm font-medium">{user.name}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl hover:bg-primary-50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary-600" />
          </div>
          <span className="text-sm font-medium truncate">{user.email}</span>
        </div>
        {user.createdAt && (
          <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl hover:bg-primary-50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm font-medium">
              Joined {format(new Date(user.createdAt), 'MMM yyyy')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;

