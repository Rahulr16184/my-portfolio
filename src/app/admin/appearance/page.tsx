
"use client";

import React from 'react';
import { Check } from 'lucide-react';
import AdminLayout from '../layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/hooks/use-portfolio-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Save, Palette } from 'lucide-react';
import { Theme } from '@/lib/types';

const colorSwatches: { name: string, hsl: string }[] = [
  { name: 'Coral', hsl: '16 93% 63%' },
  { name: 'Sky Blue', hsl: '199 89% 60%' },
  { name: 'Emerald', hsl: '150 70% 55%' },
  { name: 'Amethyst', hsl: '270 70% 70%' },
  { name: 'Goldenrod', hsl: '45 90% 55%' },
  { name: 'Ruby', hsl: '350 85% 60%' },
  { name: 'Sapphire', hsl: '215 85% 60%' },
  { name: 'Lime', hsl: '90 80% 50%' },
];

export default function AppearancePage() {
  const { portfolio, updateTheme, setPortfolio } = usePortfolioStore();
  const { toast } = useToast();
  const [selectedHsl, setSelectedHsl] = React.useState(portfolio.theme.accent);
  const originalHsl = portfolio.theme.accent;

  // Temporarily update the theme for live preview
  const handleColorSelect = (hsl: string) => {
    setSelectedHsl(hsl);
    // Use the main setPortfolio to update the store without triggering a DB write
    setPortfolio({
      ...portfolio,
      theme: { accent: hsl },
    });
  };

  const handleSaveChanges = () => {
    updateTheme({ accent: selectedHsl });
    toast({
      title: 'Theme Saved!',
      description: 'Your new accent color has been applied.',
    });
  };
  
  // Revert preview if user navigates away without saving
  React.useEffect(() => {
    const originalAccent = portfolio.theme.accent;
    return () => {
        const currentPortfolio = usePortfolioStore.getState().portfolio;
        setPortfolio({
            ...currentPortfolio,
            theme: { accent: originalAccent },
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette/> Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your portfolio by changing the accent color.
            Click a swatch to preview the changes live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Accent Color</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {colorSwatches.map((swatch) => (
                  <div key={swatch.name} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleColorSelect(swatch.hsl)}
                      className="w-12 h-12 rounded-full border-2 transition-all"
                      style={{ 
                        backgroundColor: `hsl(${swatch.hsl})`,
                        borderColor: selectedHsl === swatch.hsl ? `hsl(${swatch.hsl})` : 'hsl(var(--border))',
                      }}
                    >
                      {selectedHsl === swatch.hsl && (
                        <div className="w-full h-full rounded-full bg-black/30 flex items-center justify-center">
                            <Check className="text-white" />
                        </div>
                      )}
                    </button>
                    <span className="text-xs text-muted-foreground">{swatch.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
