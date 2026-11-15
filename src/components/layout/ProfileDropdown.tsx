'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Settings,
  LogOut,
  LogIn,
  Building2,
  Mail,
  Shield,
  CheckCircle2,
  ExternalLink,
  Camera,
  Upload,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { mockTeacherProfile } from '@/data/mockData';
import { authStore } from '@/lib/authStore';
import { TeacherProfile, AuthUser } from '@/types';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
];

export const ProfileDropdown: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile>(() => {
    const user = authStore.getCurrentUser();
    if (user) {
      return {
        name: user.name,
        email: user.email,
        role: user.role === 'teacher' ? 'Lead STEM Instructor' : 'Student Candidate',
        department: user.department || user.gradeOrTarget || 'General Sciences',
        avatarUrl: user.avatarUrl || mockTeacherProfile.avatarUrl,
      };
    }
    return mockTeacherProfile;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editDepartment, setEditDepartment] = useState(profile.department);
  const [editAvatarUrl, setEditAvatarUrl] = useState(profile.avatarUrl || mockTeacherProfile.avatarUrl);
  const [saveToast, setSaveToast] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync profile when authStore changes
  useEffect(() => {
    const syncUser = () => {
      const user = authStore.getCurrentUser();
      if (user) {
        const avatar = user.avatarUrl || mockTeacherProfile.avatarUrl;
        setProfile({
          name: user.name,
          email: user.email,
          role: user.role === 'teacher' ? 'Lead STEM Instructor' : 'Student Candidate',
          department: user.department || user.gradeOrTarget || 'General Sciences',
          avatarUrl: avatar,
        });
        setEditName(user.name);
        setEditDepartment(user.department || user.gradeOrTarget || 'General Sciences');
        setEditAvatarUrl(avatar);
      }
    };

    syncUser();
    const unsubscribe = authStore.subscribe(syncUser);
    return () => unsubscribe();
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
    const updatedName = editName.trim() || profile.name;
    const updatedDept = editDepartment.trim() || profile.department;
    const updatedAvatar = editAvatarUrl || profile.avatarUrl;

    setProfile((prev) => ({
      ...prev,
      name: updatedName,
      department: updatedDept,
      avatarUrl: updatedAvatar,
    }));

    const session = authStore.getSession();
    if (session.user) {
      const updatedUser: AuthUser = {
        ...session.user,
        name: updatedName,
        department: updatedDept,
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
    <div className="relative" ref={containerRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 text-left cursor-pointer"
        aria-label={`Open profile menu for ${profile.name}`}
        aria-expanded={isOpen}
      >
        <Avatar
          src={profile.avatarUrl}
          alt={profile.name}
          name={profile.name}
          size="sm"
        />
        <div className="hidden lg:block text-xs text-left pr-2">
          <p className="font-medium text-slate-900 leading-tight">
            {profile.name}
          </p>
          <p className="text-slate-500 text-[11px] leading-tight mt-0.5">
            {profile.role}
          </p>
        </div>
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {/* Header Info */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/60">
            <div className="flex items-center gap-3">
              <Avatar
                src={profile.avatarUrl}
                alt={profile.name}
                name={profile.name}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {profile.name}
                </p>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{profile.department}</span>
            </div>
          </div>

          {/* Menu Options */}
          <div className="p-1.5 space-y-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsProfileModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Teacher Profile Details</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push('/teacher/settings');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Department Settings & Rubrics</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push('/login');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Switch User / Sign In</span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsSignOutModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out (Session)</span>
            </button>
          </div>

          {/* Prototype Notice */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[10.5px] text-slate-500 text-center">
            Local Educator Session • No Active Cloud Auth
          </div>
        </div>
      )}

      {/* Teacher Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setIsEditing(false);
        }}
        title="Teacher Profile Information"
        description="View and manage instructor credentials and academic department affiliations."
        maxWidth="md"
      >
        <div className="space-y-4">
          {saveToast && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile details updated successfully for this session.</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="relative group">
                  <Avatar
                    src={profile.avatarUrl}
                    alt={profile.name}
                    name={profile.name}
                    size="lg"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#4F46E5] text-white shadow-xs hover:bg-[#4338CA] transition-colors"
                    title="Change profile image"
                  >
                    <Camera className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold text-slate-900 truncate">{profile.name}</h4>
                  <p className="text-xs text-indigo-600 font-medium">{profile.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="text-slate-400 block mb-0.5">Academic Department</span>
                  <span className="font-semibold text-slate-800">{profile.department}</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="text-slate-400 block mb-0.5">Platform Permissions</span>
                  <span className="font-semibold text-slate-800">Exam Author & Lead Grader</span>
                </div>
              </div>

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
              {/* Profile Image Picker & Upload */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar
                      src={editAvatarUrl}
                      alt={editName}
                      name={editName}
                      size="lg"
                    />
                  </div>

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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Upload Custom Photo</span>
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Supports JPG, PNG, WebP. Compressed automatically.
                    </p>
                  </div>
                </div>

                {/* Preset Avatars Row */}
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-medium text-slate-500 block mb-2">
                    Or select an academic preset:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditAvatarUrl(url)}
                        className={`rounded-full p-0.5 border-2 transition-all ${
                          editAvatarUrl === url
                            ? 'border-[#4F46E5] scale-105'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <Avatar
                          src={url}
                          alt={`Preset ${idx + 1}`}
                          name={`Avatar ${idx + 1}`}
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
                  Academic Department
                </label>
                <input
                  type="text"
                  required
                  value={editDepartment}
                  onChange={(e) => setEditDepartment(e.target.value)}
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
        title="Sign Out of Session"
        description="End active user session for PrepHub."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            You are currently signed in as <strong>{profile.name}</strong> ({profile.email}).
          </p>
          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            Signing out will clear your active browser authentication session. Your saved mock tests and grading records will remain safe in browser storage.
          </p>

          <div className="flex justify-end gap-2 pt-2">
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
                router.push('/teacher/login');
              }}
            >
              Confirm Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
