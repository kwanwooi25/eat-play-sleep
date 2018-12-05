import moment from 'moment';

export default (activities, options) => {
  let isDataFeed = false;
  /** check options */
  if (options.names.includes('breast', 'bottle', 'babyfood')) isDataFeed = true;

  /** set default trend data */
  let trend = { name: options.names[0], keys: [], totalCount: 0 };
  if (isDataFeed) {
    trend = {
      keys: [],
      breast: { name: options.names[0], keys: [], totalCount: 0 },
      bottle: { name: options.names[1], keys: [], totalCount: 0 },
      babyfood: { name: options.names[2], keys: [], totalCount: 0 },
    }
  }
  switch (options.names[0]) {
    case 'breast':
      trend.breast.totalDuration = 0;
      trend.bottle.totalAmount = 0;
      trend.babyfood.totalAmount = 0;
      break;

    case 'sleep':
      trend.totalDuration = 0;
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
    if (isDataFeed) {
      trend.breast.keys.push(date);
      trend.bottle.keys.push(date);
      trend.babyfood.keys.push(date);
      trend.breast[date] = { count: 0 };
      trend.bottle[date] = { count: 0 };
      trend.babyfood[date] = { count: 0 };
    } else {
      trend[date] = { count: 0 };
    }
    trend.keys.push(date);

    switch (options.names[0]) {
      case 'breast':
        trend.breast[date].duration = 0;
        trend.bottle[date].amount = 0;
        trend.babyfood[date].amount = 0;
        break;

      case 'sleep':
        trend[date].duration = 0;
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
    const isNameSame = options.names.includes(name);
    const isInRange =
      moment(options.from) <= moment(time_start) &&
      moment(time_start) <= moment(options.to);
    
    if (isNameSame && isInRange) {
      const date = moment(time_start).format('MM-DD');

      if (isDataFeed) {
        trend[name][date].count ++;
        trend[name].totalCount ++;
      } else {
        trend[date].count ++;
        trend.totalCount ++;
      }
  
      switch (name) {
        case 'breast':
          trend[name][date].duration += duration_total;
          trend[name].totalDuration += duration_total;
          break;
          
        case 'bottle':
        case 'babyfood':
          trend[name][date].amount += amount;
          trend[name].totalAmount += amount;
          break;

        case 'sleep':
          trend[date].duration += duration_total;
          trend.totalDuration += duration_total;
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