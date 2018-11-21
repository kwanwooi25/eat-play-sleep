export default activity => {
  let isValid = true;
  let error = '';
  console.log(activity);

  const {
    name,
    amount,
    type,
    duration_total,
    leftTimer,
    rightTimer,
    timer,
    height,
    weight,
    head
  } = activity;

  const shouldValidateAmount = ['pump', 'bottle', 'babyfood'].includes(name);
  const shouldValidateDuration = ['breast', 'pump', 'bottle', 'sleep'].includes(name);
  const shouldValidateType = ['bottle', 'babyfood', 'diaper'].includes(name);
  const shouldValidateGrowth = ['growth'].includes(name);

  const durationExists =
    duration_total ||
    (leftTimer && leftTimer.elapsed) ||
    (rightTimer && rightTimer.elapsed) ||
    (timer && timer.elapsed)

  if (shouldValidateAmount && !amount) {
    return { isValid: false, error: 'error_NoAmount' };
  } else if (shouldValidateType && !type) {
    return { isValid: false, error: `error_NoType_${name}` };
  } else if (shouldValidateDuration && !durationExists) {
    return { isValid: false, error: 'error_NoDuration' };
  } else if (shouldValidateGrowth && !height && !weight && !head) {
    return { isValid: false, error: 'error_NoGrowth' };
  }

  return { isValid, error };
}