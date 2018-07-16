export const API = (endpoint, stage = 'dev') => {
  return `https://1z9ortrglh.execute-api.us-east-1.amazonaws.com/${stage}/${endpoint}`
}
