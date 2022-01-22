// http://www.ciphersbyritter.com/JAVASCRP/BINOMPOI.HTM#Binomial                                           
// FACTORIALS

function Fact( x ) {
   // x factorial
   var  t=1;
   while (x > 1)
      t *= x--;
   return t;
   }

function LnFact( x ) {
   // ln(x!) by Stirling's formula
   //   see Knuth I: 111
   if (x <= 1)  x = 1;

   if (x < 12)
      return Math.log( Fact(Math.round(x)) );
   else {
      var invx = 1 / x;
      var invx2 = invx * invx;
      var invx3 = invx2 * invx;
      var invx5 = invx3 * invx2;
      var invx7 = invx5 * invx2;

      var sum = ((x + 0.5) * Math.log(x)) - x;
      sum += Math.log(2*Math.PI) / 2;
      sum += (invx / 12) - (invx3 / 360);
      sum += (invx5 / 1260) - (invx7 / 1680);

      return sum;
      }
   }
function LnComb( n, k ) {
    if ((k == 0) || (k == n))  return 0;
    else
        if ((k > n) || (k < 0))  return -1E38;
        else return  (LnFact(n) - LnFact(k) - LnFact(n-k));
    }
function BinomTerm( p, n, k ) {
  // for success probability p and n trials
  //     probability of exactly k successes
  return Math.exp( LnComb(n,k)
                    + k * Math.log(p)
                    + (n-k) * Math.log(1-p) );
  }
