import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { portfolioData as initialData } from '@/lib/portfolio-data';
import { PortfolioData } from '@/lib/types';

interface PortfolioState {
  portfolio: PortfolioData;
  setPortfolio: (data: PortfolioData) => void;
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  updateAbout: (about: Partial<PortfolioData['about']>) => void;
  updateSkills: (skills: Partial<PortfolioData['skills']>) => void;
  updateProjects: (projects: PortfolioData['projects']) => void;
  updateExperience: (experience: PortfolioData['experience']) => void;
  updateEducation: (education: PortfolioData['education']) => void;
  updateContact: (contact: Partial<PortfolioData['contact']>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      portfolio: initialData,
      setPortfolio: (data) => set({ portfolio: data }),
      updateProfile: (profile) =>
        set((state) => ({
          portfolio: { ...state.portfolio, profile: { ...state.portfolio.profile, ...profile } },
        })),
      updateAbout: (about) =>
        set((state) => ({
          portfolio: { ...state.portfolio, about: { ...state.portfolio.about, ...about } },
        })),
      updateSkills: (skills) =>
        set((state) => ({
          portfolio: { ...state.portfolio, skills: { ...state.portfolio.skills, ...skills } },
        })),
      updateProjects: (projects) =>
        set((state) => ({
          portfolio: { ...state.portfolio, projects },
        })),
      updateExperience: (experience) =>
        set((state) => ({
          portfolio: { ...state.portfolio, experience },
        })),
      updateEducation: (education) =>
        set((state) => ({
          portfolio: { ...state.portfolio, education },
        })),
      updateContact: (contact) =>
        set((state) => ({
          portfolio: { ...state.portfolio, contact: { ...state.portfolio.contact, ...contact } },
        })),
    }),
    {
      name: 'portfolio-store', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
