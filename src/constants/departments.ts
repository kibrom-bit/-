import type { Department } from '@/types/document'

export const departments: Department[] = [
  { 
    id: 1, 
    title: 'ጠቅላላ ጉባኤ', 
    tag: 'Governance', 
    desc: 'የሥራ አስፈጻሚ አባላትን መምረጥና አጠቃላይ የሥራ ሂደቱን መገምገም፡', 
    span: 'col-span-12 lg:col-span-8', 
    theme: 'dark' 
  },
  { 
    id: 2, 
    title: 'የሥራ አስፈጻሚ ጽ/ቤት', 
    tag: 'Leadership', 
    desc: 'የግቢ ጉባኤውን ሥራ በበላይነት መምራትና ዕቅዶችን ማዘጋጀት፡', 
    span: 'col-span-12 lg:col-span-4', 
    theme: 'light' 
  },
  { 
    id: 3, 
    title: 'የትምህርት ክፍል', 
    tag: 'Education', 
    desc: 'መደበኛ የትምህርት መርሐግብራትንና ሥርዓተ ትምህርትን ማስተባበር፡', 
    span: 'col-span-12 lg:col-span-6', 
    theme: 'light' 
  },
  { 
    id: 4, 
    title: 'መዝሙርና ሥነ-ጥበባት', 
    tag: 'Arts', 
    desc: 'የመዝሙር፣ የሥነ-ጽሑፍና የሥነ-ስዕል አገልግሎቶችን መከታተል፡', 
    span: 'col-span-12 lg:col-span-6', 
    theme: 'light' 
  },
  { 
    id: 5, 
    title: 'የልማት ክፍል', 
    tag: 'Development', 
    desc: 'የገቢ ማስገኛ መርሐግብራትንና ቋሚ የልማት ተቋማትን ማስተዳደር፡', 
    span: 'col-span-12 lg:col-span-4', 
    theme: 'bordered' 
  },
  { 
    id: 6, 
    title: 'ሒሳብና ንብረት', 
    tag: 'Finance', 
    desc: 'የገቢና ወጪ ሰነዶችን መያዝ፣ በጀትንና ንብረትን መቆጣጠር፡', 
    span: 'col-span-12 lg:col-span-4', 
    theme: 'bordered' 
  },
  { 
    id: 7, 
    title: 'የአባላት ጉዳይ', 
    tag: 'Members', 
    desc: 'የአባላት መረጃ፣ የንስሐና ምክር አገልግሎትን ማመቻቸት፡', 
    span: 'col-span-12 lg:col-span-4', 
    theme: 'bordered' 
  },
  { 
    id: 8, 
    title: 'ባች ማስተባበሪያ', 
    tag: 'Coordination', 
    desc: 'ተማሪዎችን በባች ማደራጀትና የቅስቀሳ ሥራዎችን ማከናወን፡', 
    span: 'col-span-12 lg:col-span-5', 
    theme: 'light' 
  },
  { 
    id: 9, 
    title: 'የሞያ አገልግሎት', 
    tag: 'Professional', 
    desc: 'አባላት በሞያቸው ቤተ ክርስቲያንን እንዲያገለግሉ ሁኔታዎችን ማመቻቸት፡', 
    span: 'col-span-12 lg:col-span-7', 
    theme: 'light' 
  },
  { 
    id: 10, 
    title: 'ሳንሱርና መርሐ ግብር', 
    tag: 'Quality', 
    desc: 'ትምህርቶችን መመርመርና ለመርሐ ግብሮች አዳራሾችን ማዘጋጀት፡', 
    span: 'col-span-12 lg:col-span-6', 
    theme: 'light' 
  },
  { 
    id: 11, 
    title: 'ኦዲትና ኢንስፔክሽን', 
    tag: 'Oversight', 
    desc: 'የሒሳብ አሠራርና የክፍሎችን የሥራ እንቅስቃሴ መቆጣጠር፡', 
    span: 'col-span-12 lg:col-span-6', 
    theme: 'dark-blue' 
  }
]