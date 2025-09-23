
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

// Helper to migrate old contact structure
const migrateContactData = (data: any): PortfolioData => {
  if (data.contact && !data.contact.socials) {
    const oldContact = data.contact as { email: string; linkedin?: string; github?: string; twitter?: string; };
    const newContact: Contact = {
      email: oldContact.email,
      socials: [],
    };
    if (oldContact.linkedin) newContact.socials.push({ id: `social-${Date.now()}-li`, platform: 'linkedin', url: oldContact.linkedin });
    if (oldContact.github) newContact.socials.push({ id: `social-${Date.now()}-gh`, platform: 'github', url: oldContact.github });
    if (oldContact.twitter) newContact.socials.push({ id: `social-${Date.now()}-tw`, platform: 'twitter', url: oldContact.twitter });
    
    return { ...data, contact: newContact };
  }
  return data as PortfolioData;
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
                const migratedData = migrateContactData(remoteData);
                set({ portfolio: migratedData, isLoading: false });
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migratedData));
            } else {
                // Try loading from local storage if firebase is empty
                const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (localData) {
                   const parsedData = JSON.parse(localData);
                   const migratedData = migrateContactData(parsedData);
                   set({ portfolio: migratedData, isLoading: false });
                } else {
                    // If nothing anywhere, use initial data and save it to firebase
                    const migratedData = migrateContactData(initialData);
                    set({ portfolio: migratedData, isLoading: false });
                    await savePortfolioData(migratedData);
                }
            }
        } catch (error) {
            console.error("Failed to initialize from Firebase, trying local storage", error);
            try {
                const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (localData) {
                    const parsedData = JSON.parse(localData);
                    const migratedData = migrateContactData(parsedData);
                    set({ portfolio: migratedData, isLoading: false });
                } else {
                    const migratedData = migrateContactData(initialData);
                    set({ portfolio: migratedData, isLoading: false });
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
