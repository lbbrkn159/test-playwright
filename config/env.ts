declare const process: {
  env: {
    BASE_URL?: string
  }
}

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
}