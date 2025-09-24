
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
import { Separator } from '@/components/ui/separator';
import ConfirmationDialog from '@/app/components/ConfirmationDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const colorSwatches: { name: string, hsl: string }[] = [
  { name: 'Coral', hsl: '16 93% 63%' },
  { name: 'Sky Blue', hsl: '199 89% 60%' },
  { name: 'Emerald', hsl: '150 70% 55%' },
  { name: 'Amethyst', hsl: '270 70% 70%' },
  { name: 'Goldenrod', hsl: '45 90% 55%' },
  { name: 'Ruby', hsl: '350 85% 60%' },
  { name: 'Sapphire', hsl: '215 85% 60%' },
  { name: 'Lime', hsl: '90 80% 50%' },
  { name: 'Teal', hsl: '180 70% 45%' },
  { name: 'Orange', hsl: '30 95% 60%' },
  { name: 'Lavender', hsl: '250 80% 80%' },
  { name: 'Mint', hsl: '160 60% 65%' },
];

const backgroundGradients: { name: string, light: string, dark: string }[] = [
  { name: 'Default', light: 'linear-gradient(to bottom right, hsl(180, 55%, 95%), hsl(200, 60%, 95%))', dark: 'linear-gradient(to bottom right, hsl(180, 40%, 15%), hsl(220, 40%, 15%))' },
  { name: 'Twilight', light: 'linear-gradient(to bottom right, #f3e7e9, #e3eeff)', dark: 'linear-gradient(to bottom right, #2c3e50, #4ca1af)' },
  { name: 'Sunrise', light: 'linear-gradient(to bottom right, #ffecd2, #fcb69f)', dark: 'linear-gradient(to bottom right, #20002c, #cbb4d4)' },
  { name: 'Ocean', light: 'linear-gradient(to bottom right, #a8c0ff, #3f2b96)', dark: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)' },
  { name: 'Rose', light: 'linear-gradient(to bottom right, #ffc3a0, #ffafbd)', dark: 'linear-gradient(to bottom right, #41295a, #2F0743)' },
  { name: 'Cosmic', light: 'linear-gradient(to bottom right, #d4fc79, #96e6a1)', dark: 'linear-gradient(to bottom right, #000000, #434343)' },
  { name: 'Minty', light: 'linear-gradient(to bottom right, #E0EFC6, #A7D3A6)', dark: 'linear-gradient(to bottom right, #1E3A3A, #0F1F1F)' },
  { name: 'Crimson', light: 'linear-gradient(to bottom right, #F5F7FA, #B8C6DB)', dark: 'linear-gradient(to bottom right, #33080a, #6e1014)' },
];

const headlineFonts = ['Playfair Display', 'Lora', 'Merriweather', 'EB Garamond'];
const bodyFonts = ['PT Sans', 'Lato', 'Open Sans', 'Roboto'];
const fontWeights = [
    { name: 'Normal', value: 400 },
    { name: 'Medium', value: 500 },
    { name: 'Semi-bold', value: 600 },
    { name: 'Bold', value: 700 },
    { name: 'Extra-bold', value: 800 },
    { name: 'Black', value: 900 },
]

export default function AppearancePage() {
  const { portfolio, updateTheme, setPortfolio } = usePortfolioStore();
  const { toast } = useToast();
  
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>(portfolio.theme);

  const handleValueChange = (key: keyof Theme, value: string | number) => {
    const newTheme = { ...selectedTheme, [key]: value };
    setSelectedTheme(newTheme);
    setPortfolio({ ...portfolio, theme: newTheme });
  };

  const handleSaveChanges = () => {
    updateTheme(selectedTheme);
    toast({
      title: 'Theme Saved!',
      description: 'Your new appearance settings have been applied.',
    });
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette/> Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your portfolio.
            Click an option to preview the changes live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Accent Color</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {colorSwatches.map((swatch) => (
                  <div key={swatch.name} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleValueChange('accent', swatch.hsl)}
                      className="w-12 h-12 rounded-full border-2 transition-all"
                      style={{ 
                        backgroundColor: `hsl(${swatch.hsl})`,
                        borderColor: selectedTheme.accent === swatch.hsl ? `hsl(${swatch.hsl})` : 'hsl(var(--border))',
                      }}
                    >
                      {selectedTheme.accent === swatch.hsl && (
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

            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Background Gradient</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {backgroundGradients.map((gradient) => (
                  <div key={gradient.name} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleValueChange('backgroundTheme', gradient.name)}
                      className={cn(
                        "w-full h-24 rounded-lg border-2 transition-all flex flex-col justify-end p-2",
                        selectedTheme.backgroundTheme === gradient.name ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"
                      )}
                      style={{ background: gradient.light }}
                    >
                      <div className="w-1/3 h-1/3 rounded-md" style={{ background: gradient.dark }} />
                    </button>
                    <span className="text-sm text-muted-foreground">{gradient.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Typography</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label htmlFor="headline-font">Headline Font</Label>
                    <div className='flex gap-2'>
                        <Select value={selectedTheme.headlineFont} onValueChange={(value) => handleValueChange('headlineFont', value)}>
                            <SelectTrigger id="headline-font" className="flex-grow">
                                <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                            <SelectContent>
                                {headlineFonts.map(font => (
                                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                                        {font}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedTheme.headlineWeight.toString()} onValueChange={(value) => handleValueChange('headlineWeight', parseInt(value))}>
                            <SelectTrigger id="headline-weight" className="w-[120px]">
                                <SelectValue placeholder="Weight" />
                            </SelectTrigger>
                            <SelectContent>
                                {fontWeights.map(weight => (
                                    <SelectItem key={weight.value} value={weight.value.toString()}>
                                        {weight.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-muted-foreground text-3xl" style={{ fontFamily: `'${selectedTheme.headlineFont}', serif`, fontWeight: selectedTheme.headlineWeight }}>The quick brown fox...</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="body-font">Body Font</Label>
                    <Select value={selectedTheme.bodyFont} onValueChange={(value) => handleValueChange('bodyFont', value)}>
                        <SelectTrigger id="body-font">
                            <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                            {bodyFonts.map(font => (
                                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <p className="text-muted-foreground" style={{ fontFamily: `'${selectedTheme.bodyFont}', sans-serif` }}>...jumps over the lazy dog.</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <ConfirmationDialog
                title="Save Theme Changes?"
                description="This will apply the new appearance settings to your entire portfolio."
                onConfirm={handleSaveChanges}
              >
                <Button type="button">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </ConfirmationDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
