
import { create } from 'zustand';
import { portfolioData as initialData } from '@/lib/portfolio-data';
import { PortfolioData, Profile, About, Skills, Project, Experience, Education, Contact } from '@/lib/types';
import { getPortfolioData, savePortfolioData } from '@/lib/firebase';

const LOCAL_STORAGE_KEY = 'portfolio-data';

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
    // Save to local storage immediately
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, jsonData);
    } catch (error) {
        console.error("Error saving to local storage:", error);
    }

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
        set({ isLoading: true });
        try {
            const remoteData = await getPortfolioData();
            if (remoteData) {
                set({ portfolio: remoteData, isLoading: false });
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remoteData));
            } else {
                // Try loading from local storage if firebase is empty
                const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (localData) {
                    set({ portfolio: JSON.parse(localData), isLoading: false });
                } else {
                    // If nothing anywhere, use initial data and save it to firebase
                    set({ portfolio: initialData, isLoading: false });
                    await savePortfolioData(initialData);
                }
            }
        } catch (error) {
            console.error("Failed to initialize from Firebase, trying local storage", error);
            try {
                const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (localData) {
                    set({ portfolio: JSON.parse(localData), isLoading: false });
                } else {
                    set({ portfolio: initialData, isLoading: false });
                }
            } catch (localError) {
                console.error("Failed to load from local storage", localError);
                set({ portfolio: initialData, isLoading: false });
            }
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
