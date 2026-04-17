const fs = require('fs');
const path = require('path');

function generalize(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Locations
  content = content.replace(/Camarillo's/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}'s");
  content = content.replace(/Camarillo/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}");
  content = content.replace(/Ventura County/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY} Area");
  content = content.replace(/Las Posas Estates/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}");
  content = content.replace(/Old Town/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}");
  content = content.replace(/Mission Oaks/g, "${process.env.NEXT_PUBLIC_LOCATION_PRIMARY}");

  // Names
  content = content.replace(/Marcus & Elena Vargas/g, "${process.env.NEXT_PUBLIC_OWNER_NAMES}");
  content = content.replace(/Marcus and Elena/g, "${process.env.NEXT_PUBLIC_OWNER_NAMES}");
  content = content.replace(/Marcus Vargas/g, "${process.env.NEXT_PUBLIC_OWNER_NAMES}");
  content = content.replace(/Elena Vargas/g, "${process.env.NEXT_PUBLIC_OWNER_NAMES}");
  content = content.replace(/Marcus/g, "${process.env.NEXT_PUBLIC_OWNER_NAMES}");

  // Dates
  content = content.replace(/2009/g, "${process.env.NEXT_PUBLIC_FOUNDED_YEAR}");
  
  // Specific Descriptions
  content = content.replace(/Boutique architectural design-build serving Camarillo, Thousand Oaks, Oxnard,\n                  and the greater Ventura County coastline since 2009./g, "${process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION_LONG}");
  
  fs.writeFileSync(filePath, content);
  console.log('Generalized: ' + filePath);
}

generalize('src/app/about/page.tsx');
generalize('src/app/page.tsx');
// Also maybe contact/portfolio? If they exist and contain Camarillo.
generalize('src/app/contact/page.tsx');
generalize('src/app/portfolio/page.tsx');
