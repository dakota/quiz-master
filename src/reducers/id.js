import uuid from 'uuid';

const id = (state = uuid.v4(), action) =>
{
  return state;
}

export default id
