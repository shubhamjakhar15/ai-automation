import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Calendar, TrendingUp, Settings, LogOut, User, 
  Activity, Mail, Clock, CreditCard, Shield, ChevronRight, Home, Bell, Database
} from 'lucide-react';
import KnowledgeUpload from '../components/admin/KnowledgeUpload';

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const T = {
  bg: "#F4F7FC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  accent: "#2563EB",
  accent2: "#3B82F6",
  softBlue: "#E0F2FE",
  text: "#0F172A",
  text2: "#334155",
  muted: "#64748B",
  success: "#10B981",
  danger: "#EF4444"
};

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await user.update({
        firstName: firstName,
        lastName: lastName
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user:', err);
      alert(err.errors?.[0]?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;
  }

  if (!isSignedIn) {
    navigate('/login');
    return null;
  }

  const handleSignOut = () => {
    signOut(() => navigate('/'));
  };

  const isAdmin = user.publicMetadata?.role === 'admin';

  const menuItems = [
    { id: 'profile', label: 'User Profile', icon: <User size={18} /> },
    { id: 'overview', label: 'Dashboard Overview', icon: <Activity size={18} /> },
    { id: 'billing', label: 'Billing & Plan', icon: <CreditCard size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  if (isAdmin) {
    menuItems.push({ id: 'admin', label: 'Admin Panel', icon: <Database size={18} /> });
  }

  return (
    <div className="min-h-screen flex font-sans" style={{ background: T.bg, color: T.text }}>
      {/* SIDEBAR */}
      <aside className="w-64 border-r hidden md:flex flex-col" style={{ background: T.card, borderColor: T.border }}>
        <div className="p-6 border-b flex items-center gap-2 cursor-pointer" style={{ borderColor: T.border }} onClick={() => navigate('/')}>
           <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.accent2}, ${T.accent})` }}>
              <Phone size={16} color="#fff" />
            </div>
            <span className="font-bold text-lg tracking-tight">Receptio<span style={{ color: T.accent2 }}>AI</span></span>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold mb-4 tracking-wider uppercase mt-4" style={{ color: T.muted }}>Menu</div>
          <nav className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'font-medium' : ''}`}
                style={{ 
                  background: activeTab === item.id ? T.softBlue : 'transparent',
                  color: activeTab === item.id ? T.accent : T.text2
                }}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t" style={{ borderColor: T.border }}>
          <button 
            onClick={() => navigate('/chat')}
            className="w-full flex items-center justify-center gap-2 mb-4 px-3 py-3 rounded-xl transition-all duration-200 font-bold shadow-md"
            style={{ background: `linear-gradient(135deg, ${T.accent2}, ${T.accent})`, color: '#fff' }}
          >
            <Phone size={18} />
            Open AI Chat
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-red-50 text-sm font-medium"
            style={{ color: T.danger }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* HEADER */}
        <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-10" style={{ background: T.card, borderColor: T.border }}>
           <div className="flex items-center gap-2 md:hidden">
               <Phone size={20} color={T.accent2} />
               <span className="font-bold">ReceptioAI</span>
           </div>
           <div className="hidden md:flex items-center text-sm font-medium" style={{ color: T.muted }}>
             <Home size={14} className="mr-2 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
             <ChevronRight size={14} className="mx-1" />
             <span style={{ color: T.text }}>{menuItems.find(m => m.id === activeTab)?.label}</span>
           </div>
           
           <div className="flex items-center gap-4">
             <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
               <Bell size={20} style={{ color: T.text2 }} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
             </button>
             <img src={user.imageUrl} alt="Avatar" className="w-9 h-9 rounded-full border-2 object-cover" style={{ borderColor: T.softBlue }} />
             
             {/* Mobile Sign Out */}
             <button onClick={handleSignOut} className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded-full">
               <LogOut size={18} />
             </button>
           </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.firstName || 'User'}!</h1>
            <p style={{ color: T.muted }}>Manage your account details and view your AI receptionist performance.</p>
          </div>

          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* PROFILE CARD */}
              <div className="md:col-span-1 rounded-2xl p-6 border flex flex-col items-center text-center shadow-sm" style={{ background: T.card, borderColor: T.border }}>
                <div className="relative mb-4">
                  <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full border-4 object-cover" style={{ borderColor: T.softBlue }} />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ background: T.success, borderColor: T.card }}>
                    <Shield size={12} color="#fff" />
                  </div>
                </div>
                <h2 className="text-lg font-bold">{user.fullName}</h2>
                <p className="text-sm mb-4" style={{ color: T.muted }}>{user.primaryEmailAddress?.emailAddress}</p>
                <div className="w-full rounded-xl p-3 flex flex-col gap-2 text-sm text-left" style={{ background: T.bg }}>
                   <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: T.border }}>
                     <span style={{ color: T.muted }}>Status</span>
                     <span className="font-semibold text-green-600">Active</span>
                   </div>
                   <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: T.border }}>
                     <span style={{ color: T.muted }}>Plan</span>
                     <span className="font-semibold" style={{ color: T.accent2 }}>Pro Tier</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span style={{ color: T.muted }}>Joined</span>
                     <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
              </div>

              {/* DETAILS FORM / SETTINGS */}
              <div className="md:col-span-2 rounded-2xl border shadow-sm" style={{ background: T.card, borderColor: T.border }}>
                <div className="p-6 border-b" style={{ borderColor: T.border }}>
                  <h3 className="font-bold text-lg">Personal Information</h3>
                  <p className="text-sm" style={{ color: T.muted }}>Your core profile details associated with your account.</p>
                </div>
                <div className="p-6 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: T.muted }}>First Name</label>
                       {isEditing ? (
                         <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: T.border, background: T.card }} placeholder="First Name" />
                       ) : (
                         <div className="w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm font-medium" style={{ borderColor: T.border }}>{user.firstName || '-'}</div>
                       )}
                     </div>
                     <div>
                       <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: T.muted }}>Last Name</label>
                       {isEditing ? (
                         <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ borderColor: T.border, background: T.card }} placeholder="Last Name" />
                       ) : (
                         <div className="w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm font-medium" style={{ borderColor: T.border }}>{user.lastName || '-'}</div>
                       )}
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: T.muted }}>Email Address</label>
                       <div className="w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm font-medium flex items-center justify-between" style={{ borderColor: T.border }}>
                         <span>{user.primaryEmailAddress?.emailAddress}</span>
                         {user.primaryEmailAddress?.verification?.status === 'verified' && (
                           <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 font-semibold">Verified</span>
                         )}
                       </div>
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: T.muted }}>User ID</label>
                       <div className="w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-xs font-mono" style={{ borderColor: T.border, color: T.muted }}>{user.id}</div>
                     </div>
                   </div>
                   <div className="pt-4 flex justify-end gap-3">
                     {isEditing ? (
                       <>
                         <button onClick={() => setIsEditing(false)} disabled={isSaving} className="px-5 py-2.5 rounded-xl font-medium text-sm border hover:bg-gray-50 transition-colors" style={{ borderColor: T.border, color: T.text2 }}>
                           Cancel
                         </button>
                         <button onClick={handleSave} disabled={isSaving} className="px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0" style={{ background: `linear-gradient(180deg, ${T.accent2}, ${T.accent})`, boxShadow: `0 4px 14px -4px ${T.accent}` }}>
                           {isSaving ? 'Saving...' : 'Save Changes'}
                         </button>
                       </>
                     ) : (
                       <button onClick={handleEditClick} className="px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-transform hover:-translate-y-0.5" style={{ background: `linear-gradient(180deg, ${T.accent2}, ${T.accent})`, boxShadow: `0 4px 14px -4px ${T.accent}` }}>
                         Edit Profile
                       </button>
                     )}
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
               {/* STATS */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Total Calls Handled", val: "1,248", icon: <Phone size={18} />, color: T.accent2 },
                    { label: "Appointments Booked", val: "342", icon: <Calendar size={18} />, color: T.success },
                    { label: "Hours Saved", val: "124h", icon: <Clock size={18} />, color: "#F59E0B" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl border shadow-sm flex items-start justify-between" style={{ background: T.card, borderColor: T.border }}>
                       <div>
                         <p className="text-sm font-medium mb-1" style={{ color: T.muted }}>{stat.label}</p>
                         <h3 className="text-3xl font-bold">{stat.val}</h3>
                       </div>
                       <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50" style={{ color: stat.color }}>
                         {stat.icon}
                       </div>
                    </div>
                  ))}
               </div>

               {/* RECENT ACTIVITY */}
               <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ background: T.card, borderColor: T.border }}>
                  <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: T.border }}>
                    <h3 className="font-bold text-lg">Recent AI Activity</h3>
                    <button className="text-sm font-medium hover:underline" style={{ color: T.accent2 }}>View All</button>
                  </div>
                  <div className="divide-y" style={{ borderColor: T.border }}>
                     {[
                       { type: "call", title: "Inbound Call from +1 (555) 0192", time: "10 mins ago", status: "Resolved" },
                       { type: "booking", title: "New Appointment: Sarah Jenkins", time: "1 hour ago", status: "Confirmed" },
                       { type: "call", title: "Inbound Call from +1 (555) 3341", time: "2 hours ago", status: "Voicemail" },
                       { type: "booking", title: "New Appointment: Mike Ross", time: "5 hours ago", status: "Confirmed" }
                     ].map((act, i) => (
                       <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: act.type === 'call' ? T.softBlue : 'rgba(16,185,129,0.1)' }}>
                               {act.type === 'call' ? <Phone size={16} color={T.accent2} /> : <Calendar size={16} color={T.success} />}
                             </div>
                             <div>
                               <p className="text-sm font-semibold">{act.title}</p>
                               <p className="text-xs" style={{ color: T.muted }}>{act.time}</p>
                             </div>
                          </div>
                          <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ 
                            background: act.status === 'Confirmed' || act.status === 'Resolved' ? 'rgba(16,185,129,0.1)' : '#F1F5F9',
                            color: act.status === 'Confirmed' || act.status === 'Resolved' ? T.success : T.muted
                          }}>
                            {act.status}
                          </span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <div className="space-y-6">
               <h3 className="text-xl font-bold mb-4">Admin Knowledge Upload</h3>
               <KnowledgeUpload />
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'billing' || activeTab === 'settings') && (
            <div className="rounded-2xl border shadow-sm p-12 text-center" style={{ background: T.card, borderColor: T.border }}>
               <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                 {activeTab === 'billing' ? <CreditCard size={24} color={T.muted} /> : <Settings size={24} color={T.muted} />}
               </div>
               <h3 className="text-lg font-bold mb-2">Coming Soon</h3>
               <p className="text-sm max-w-md mx-auto" style={{ color: T.muted }}>This section is currently under development. Please check back later for updates to your {activeTab} preferences.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
