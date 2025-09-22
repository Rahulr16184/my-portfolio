import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved. Built with PortfolioForge.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
