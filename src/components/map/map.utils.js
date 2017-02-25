export default function calcAzimuth([llat1, llong1], [llat2, llong2]) {
  const lat1 = (llat1 * Math.PI) / 180;
  const lat2 = (llat2 * Math.PI) / 180;
  const long1 = (llong1 * Math.PI) / 180;
  const long2 = (llong2 * Math.PI) / 180;

  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);

  let y = Math.pow(Math.sqrt((cl2 * sdelta), 2))
    + Math.pow(((cl1 * sl2) - (sl1 * cl2 * cdelta)), 2);
  let x = (sl1 * sl2) + (cl1 * cl2 * cdelta);
  x = (cl1 * sl2) - (sl1 * cl2 * cdelta);
  y = sdelta * cl2;

  let z = (Math.atan(-y / x) * 180) / Math.PI;
  z = x < 0 ? z + 180 : z;

  let z2 = ((z + 180) % 360) - 180;
  z2 = (-z2 * Math.PI) / 180;

  const anglerad2 = z2 - (2 * Math.PI * Math.floor(z2 / (2 * Math.PI)));
  const angledeg = (anglerad2 * 180) / Math.PI;

  return angledeg;
}
