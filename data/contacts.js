class Contact {
  constructor(type, brand, style, price) {
    this.type = type;
    this.brand = brand;
    this.style = style;
    this.price = price;
  }
}

const contacts = [
  new Contact('daily', 'Acuvue', 'Moist', 56),
  new Contact('daily', 'Alcon', 'AquaComfort Plus', 52),
  new Contact('daily', 'Bausch + Lomb', 'ONEDay', 45),
  new Contact('daily', 'CooperVision', 'Clarity', 60),
  new Contact('weekly', 'Acuvue', 'Oasys', 60),
  new Contact('weekly', 'Bausch + Lomb', 'SofLens', 58),
  new Contact('weekly', 'CooperVision', 'Avaira', 56),
  new Contact('monthly', 'Acuvue', 'Vita', 52),
  new Contact('monthly', 'Alcon', 'Air Optix', 48),
  new Contact('monthly', 'Bausch + Lomb', 'Ultra', 42),
  new Contact('monthly', 'CooperVision', 'Biofininity', 52)
];