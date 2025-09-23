
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { portfolioData as initialData } from '@/lib/portfolio-data';
import { PortfolioData, Profile, About, Skills, Project, Experience, Education, Contact } from '@/lib/types';

interface PortfolioState {
  portfolio: PortfolioData;
  setPortfolio: (data: PortfolioData) => void;
  updateProfile: (profile: Profile) => void;
  updateAbout: (about: About) => void;
  updateSkills: (skills: Skills) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateContact: (contact: Contact) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      portfolio: initialData,
      setPortfolio: (data) => set({ portfolio: data }),
      updateProfile: (profile) =>
        set((state) => ({
          portfolio: { ...state.portfolio, profile },
        })),
      updateAbout: (about) =>
        set((state) => ({
          portfolio: { ...state.portfolio, about },
        })),
      updateSkills: (skills) =>
        set((state) => ({
          portfolio: { ...state.portfolio, skills },
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
          portfolio: { ...state.portfolio, contact },
        })),
    }),
    {
      name: 'portfolio-store', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
