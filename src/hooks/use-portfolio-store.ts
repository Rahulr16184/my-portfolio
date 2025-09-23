
import { create } from 'zustand';
import { portfolioData as initialData } from '@/lib/portfolio-data';
import { PortfolioData, Profile, About, Skills, Project, Experience, Education, Contact } from '@/lib/types';
import { getPortfolioData, savePortfolioData } from '@/lib/firebase';

interface PortfolioState {
  portfolio: PortfolioData;
  isLoading: boolean;
  initializePortfolio: () => Promise<void>;
  setPortfolio: (data: PortfolioData) => void;
  updateProfile: (profile: Profile) => void;
  updateAbout: (about: About) => void;
  updateSkills: (skills: Skills) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateContact: (contact: Contact) => void;
}

const writeToDb = (data: PortfolioData) => {
    // Debounce saving to Firebase
    clearTimeout((window as any).__saveTimeout);
    (window as any).__saveTimeout = setTimeout(() => {
        savePortfolioData(data);
    }, 1000);
}

export const usePortfolioStore = create<PortfolioState>()(
    (set, get) => ({
      portfolio: initialData,
      isLoading: true,
      initializePortfolio: async () => {
        const remoteData = await getPortfolioData();
        if (remoteData) {
            set({ portfolio: remoteData, isLoading: false });
        } else {
            set({ isLoading: false });
             // Optionally save initial data to firebase if it doesn't exist
            savePortfolioData(initialData);
        }
      },
      setPortfolio: (data) => set({ portfolio: data }),
      updateProfile: (profile) =>
        set((state) => {
          const newState = { portfolio: { ...state.portfolio, profile } };
          writeToDb(newState.portfolio);
          return newState;
        }),
      updateAbout: (about) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, about } };
           writeToDb(newState.portfolio);
           return newState;
        }),
      updateSkills: (skills) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, skills } };
           writeToDb(newState.portfolio);
           return newState;
        }),
      updateProjects: (projects) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, projects } };
           writeToDb(newState.portfolio);
           return newState;
        }),
      updateExperience: (experience) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, experience } };
           writeToDb(newState.portfolio);
           return newState;
        }),
      updateEducation: (education) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, education } };
           writeToDb(newState.portfolio);
           return newState;
        }),
      updateContact: (contact) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, contact } };
           writeToDb(newState.portfolio);
           return newState;
        }),
    })
);
