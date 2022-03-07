import { sayHello } from './grpc';

async function main() {
  try {
    const resp = await sayHello();
    console.log('Got response from server', resp);
  } catch (err) {
    console.error('An error occured: ', err);
  }
}

main()
  .then(() => {
    console.log('main finished');
  })
  .catch((err) => {
    console.error('main error catched: ', err);
  });
