const end = new Date();
end.setHours(23);
end.setMinutes(59);
end.setSeconds(59);
const start = new Date();
start.setHours(0);
start.setMinutes(0);
start.setSeconds(0);
export const today = [start, end];
