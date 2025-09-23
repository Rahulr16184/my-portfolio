
import { create } from 'zustand';
import { portfolioData as initialData } from '@/lib/portfolio-data';
import { PortfolioData, Profile, About, Skills, Project, Experience, Education, Contact, Resume, Theme } from '@/lib/types';
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
  updateTheme: (theme: Theme) => void;
}

// Helper to migrate old data structures
const migrateData = (data: any): PortfolioData => {
  let migratedData = { ...initialData, ...data };

  // Migrate old contact structure
  if (migratedData.contact && !migratedData.contact.socials) {
    const oldContact = migratedData.contact as { email: string; linkedin?: string; github?: string; twitter?: string; };
    const newContact: Contact = {
      email: oldContact.email,
      socials: [],
    };
    if (oldContact.linkedin) newContact.socials.push({ id: `social-${Date.now()}-li`, platform: 'linkedin', url: oldContact.linkedin });
    if (oldContact.github) newContact.socials.push({ id: `social-${Date.now()}-gh`, platform: 'github', url: oldContact.github });
    if (oldContact.twitter) newContact.socials.push({ id: `social-${Date.now()}-tw`, platform: 'twitter', url: oldContact.twitter });
    
    migratedData.contact = newContact;
  }

  // Migrate old resumeUrl to new resumes array
  if (migratedData.profile && migratedData.profile.resumeUrl && !migratedData.profile.resumes) {
    const oldProfile = migratedData.profile as { resumeUrl: string };
    const newResumes: Resume[] = [];
    if (oldProfile.resumeUrl) {
      newResumes.push({ id: `resume-${Date.now()}`, name: "Download Resume", url: oldProfile.resumeUrl });
    }
    migratedData.profile = { ...migratedData.profile, resumes: newResumes };
    delete migratedData.profile.resumeUrl;
  } else if (migratedData.profile && !migratedData.profile.resumes) {
    // If resumes is missing completely
    migratedData.profile.resumes = [];
  }

  // Ensure theme object exists
  if (!migratedData.theme) {
    migratedData.theme = initialData.theme;
  }
  // Ensure backgroundTheme property exists
  if (migratedData.theme && !migratedData.theme.backgroundTheme) {
    migratedData.theme.backgroundTheme = initialData.theme.backgroundTheme;
  }


  return migratedData as PortfolioData;
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
                const migratedData = migrateData(remoteData);
                set({ portfolio: migratedData, isLoading: false });
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migratedData));
            } else {
                // Try loading from local storage if firebase is empty
                const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (localData) {
                   const parsedData = JSON.parse(localData);
                   const migratedData = migrateData(parsedData);
                   set({ portfolio: migratedData, isLoading: false });
                } else {
                    // If nothing anywhere, use initial data and save it to firebase
                    const migratedData = migrateData(initialData);
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
                    const migratedData = migrateData(parsedData);
                    set({ portfolio: migratedData, isLoading: false });
                } else {
                    const migratedData = migrateData(initialData);
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
      updateTheme: (theme) =>
        set((state) => {
           const newState = { portfolio: { ...state.portfolio, theme: { ...state.portfolio.theme, ...theme } } };
           writeToDb(newState.portfolio);
           return newState;
        }),
    })
);
