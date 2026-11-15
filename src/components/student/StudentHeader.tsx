'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  BookOpen,
  LogOut,
  User,
  Camera,
  Upload,
  CheckCircle2,
  Mail,
  Target,
  Sparkles,
} from 'lucide-react';
import { authStore, DEMO_STUDENT } from '@/lib/authStore';
import { AuthUser } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PrepHubLogo } from '@/components/brand/PrepHubLogo';

const PRESET_STUDENT_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
];

export const StudentHeader: React.FC = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authStore.getCurrentUser());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editTarget, setEditTarget] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncUser = () => {
      const user = authStore.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setEditName(user.name);
        setEditTarget(user.gradeOrTarget || 'General Curriculum');
        setEditAvatarUrl(user.avatarUrl || DEMO_STUDENT.avatarUrl || '');
      }
    };

    syncUser();
    const unsub = authStore.subscribe(syncUser);
    return () => unsub();
  }, []);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const studentName = currentUser?.name || 'Student Candidate';
  const studentEmail = currentUser?.email || 'student@prephub.edu';
  const studentTarget =
    currentUser?.gradeOrTarget ||
    (currentUser?.course && currentUser?.branch
      ? `${currentUser.course} • ${currentUser.branch}`
      : 'General Curriculum');
  const studentAvatar = currentUser?.avatarUrl || DEMO_STUDENT.avatarUrl;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setEditAvatarUrl(compressed);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedName = editName.trim() || studentName;
    const updatedTarget = editTarget.trim() || studentTarget;
    const updatedAvatar = editAvatarUrl || studentAvatar;

    const session = authStore.getSession();
    if (session.user) {
      const updatedUser: AuthUser = {
        ...session.user,
        name: updatedName,
        gradeOrTarget: updatedTarget,
        avatarUrl: updatedAvatar,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('prephub_auth_session', JSON.stringify({ ...session, user: updatedUser }));
        window.dispatchEvent(new Event('prephub_auth_change'));
      }
    }

    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 shadow-2xs">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <PrepHubLogo href="/student" tagline="STUDENT PORTAL" size="md" />
        </div>

        {/* Right Navigation & Profile */}
        <div className="flex items-center gap-2.5" ref={containerRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left cursor-pointer"
              aria-label={`Open profile menu for ${studentName}`}
              aria-expanded={isDropdownOpen}
            >
              <Avatar
                src={studentAvatar}
                alt={studentName}
                name={studentName}
                size="sm"
              />
              <div className="hidden sm:block text-xs text-left pr-1.5">
                <p className="font-semibold text-slate-900 leading-tight">{studentName}</p>
                <p className="text-slate-500 font-mono text-[10px] leading-tight mt-0.5 truncate max-w-[170px]">
                  {currentUser?.universityRoll ? `Roll: ${currentUser.universityRoll}` : ''}
                  {currentUser?.universityRoll && (currentUser?.branch || currentUser?.course) ? ' • ' : ''}
                  {currentUser?.branch || currentUser?.course || studentTarget}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-modal border border-slate-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3.5 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      src={studentAvatar}
                      alt={studentName}
                      name={studentName}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{studentName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{studentEmail}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-200/60 truncate font-medium">
                    {currentUser?.universityRoll ? `Roll: ${currentUser.universityRoll} • ` : ''}
                    {currentUser?.branch || studentTarget}
                  </div>
                </div>

                <div className="p-1.5 space-y-0.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile &amp; Photo</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsSignOutModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clean Direct Logout Button */}
          <button
            type="button"
            onClick={() => {
              authStore.logout();
              router.push('/');
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/80 border border-slate-200 shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
            title="Clear session and return to login"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Student Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setIsEditing(false);
        }}
        title="Student Profile"
        description="Manage your profile information and student avatar."
        maxWidth="md"
      >
        <div className="space-y-4">
          {saveToast && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile details updated successfully.</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="relative">
                  <Avatar
                    src={studentAvatar}
                    alt={studentName}
                    name={studentName}
                    size="lg"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#4F46E5] text-white shadow-xs hover:bg-[#4338CA] transition-colors"
                    title="Change avatar"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-slate-900 truncate">{studentName}</h4>
                  <p className="text-xs text-indigo-600 font-medium">Candidate Account</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{studentEmail}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white text-xs">
                <span className="text-slate-400 block mb-0.5">Academic Target / Exam</span>
                <span className="font-semibold text-slate-800">{studentTarget}</span>
              </div>

              {/* Student Academic Details Grid */}
              {(currentUser?.universityRoll || currentUser?.classRoll || currentUser?.course) && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentUser?.universityRoll && (
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-400 block text-[11px]">University Roll No</span>
                      <span className="font-semibold text-slate-800">{currentUser.universityRoll}</span>
                    </div>
                  )}
                  {currentUser?.classRoll && (
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-400 block text-[11px]">Class Roll &amp; Section</span>
                      <span className="font-semibold text-slate-800">
                        {currentUser.classRoll} (Sec {currentUser.section || 'A'})
                      </span>
                    </div>
                  )}
                  {currentUser?.course && (
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-400 block text-[11px]">Course</span>
                      <span className="font-semibold text-slate-800">{currentUser.course}</span>
                    </div>
                  )}
                  {currentUser?.branch && (
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-400 block text-[11px]">Branch</span>
                      <span className="font-semibold text-slate-800">{currentUser.branch}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsProfileModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile & Photo
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Image Picker */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={editAvatarUrl}
                    alt={editName}
                    name={editName}
                    size="lg"
                  />
                  <div className="space-y-1.5 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Upload Custom Photo</span>
                    </button>
                    <p className="text-[11px] text-slate-500">
                      JPG, PNG, WebP auto-compressed.
                    </p>
                  </div>
                </div>

                {/* Presets */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-medium text-slate-500 block mb-2">
                    Or select an avatar preset:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_STUDENT_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditAvatarUrl(url)}
                        className={`rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                          editAvatarUrl === url
                            ? 'border-[#4F46E5] scale-105'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <Avatar
                          src={url}
                          alt={`Preset ${idx + 1}`}
                          name={`Preset ${idx + 1}`}
                          size="sm"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Exam / Academic Grade
                </label>
                <input
                  type="text"
                  required
                  value={editTarget}
                  onChange={(e) => setEditTarget(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>

      {/* Sign Out Modal */}
      <Modal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        title="Sign Out"
        description="End active student session."
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p className="leading-relaxed">
            You are currently signed in as <strong>{studentName}</strong> ({studentEmail}).
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSignOutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                authStore.logout();
                setIsSignOutModalOpen(false);
                router.push('/');
              }}
            >
              Confirm Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
