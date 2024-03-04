
 const BASE_URL = 'https://cat-fact.herokuapp.com/facts';

export const CAT_FACT_URL = {
  getById:`${BASE_URL}/:id`,
  random: `${BASE_URL}/random`,
  me: `${BASE_URL}/me`,
} as const;