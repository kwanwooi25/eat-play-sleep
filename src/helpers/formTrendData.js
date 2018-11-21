import moment from 'moment';

export default (activities, options) => {
  /** set default trend data */
  const trend = { name: options.name, keys: [], totalCount: 0 };
  switch (options.name) {
    case 'breast':
    case 'sleep':
      trend.totalDuration = 0;
      break;

    case 'bottle':
    case 'babyfood':
      trend.totalAmount = 0;
      break;
    
    case 'diaper':
      trend.totalPee = 0;
      trend.totalPoo = 0;
      break;

    default:
      break;
  }

  /** initialize data */
  for (let i = moment(options.from); i < moment(options.to); i.add(1, 'days')) {
    const date = i.format('MM-DD');
    trend.keys.push(date);
    trend[date] = { count: 0 };
    switch (options.name) {
      case 'breast':
      case 'sleep':
        trend[date].duration = 0;
        break;

      case 'bottle':
      case 'babyfood':
        trend[date].amount = 0;
        break;
      
      case 'diaper':
        trend[date].pee = 0;
        trend[date].poo = 0;
        break;
      
      case 'growth':
        trend[date].height = 0;
        trend[date].weight = 0;
        trend[date].head = 0;
        break;

      default:
        break;
    }
  }

  /** save relative data into respective date field */
  activities.forEach(({
    name,
    time_start,
    duration_total,
    amount,
    type,
    height,
    weight,
    head,
  }) => {
    const isNameSame = name === options.name;
    const isInRange =
      moment(options.from) <= moment(time_start) &&
      moment(time_start) <= moment(options.to);
    
    if (isNameSame && isInRange) {
      const date = moment(time_start).format('MM-DD');
  
      trend[date].count ++;
      trend.totalCount ++;

      switch (options.name) {
        case 'breast':
        case 'sleep':
          trend[date].duration += duration_total;
          trend.totalDuration += duration_total;
          break;
  
        case 'bottle':
        case 'babyfood':
          trend[date].amount += amount;
          trend.totalAmount += amount;
          break;
        
        case 'diaper':
          if (type && type === 'peepoo') {
            trend[date].pee ++;
            trend[date].poo ++;
            trend.totalPee ++;
            trend.totalPoo ++;
          } else {
            trend[date][type] ++;
            if (type === 'pee') trend.totalPee ++;
            else if (type === 'poo') trend.totalPoo ++;
          }
          break;

        case 'growth':
          trend[date].height = height;
          trend[date].weight = weight;
          trend[date].head = head;
          break;
  
        default:
          break;
      } 
    }
  });

  return trend;
}