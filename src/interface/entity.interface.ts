export interface LogInterface {
  readonly created_at?: string;
  readonly created_by?: string;
  readonly updated_at?: string;
  readonly udpated_by?: string;
}

export interface JwtInterface {
  readonly access_token: string;
  readonly refresh_token: string;
}
// example generic
// interface Pair<F, S> {
//   first: F;
//   second: S;
// }

// let p : Pair<String, number> = {first: "10K", second: 1000};
// console.log(p);
