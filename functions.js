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

function ChartUpdate(chart, numberOfDice, successRate) {
    
    var outcomes = [];
    var outcomesLabel = [];
    for ( k = 0; k <= numberOfDice; k++) {
        prob = (BinomTerm( successRate, numberOfDice, k )*100).toFixed(2);
        if (prob >= .1) {
            outcomes.push(prob);
            outcomesLabel.push(k);
        }
    }

    //update and draw the new chart
    outcomesChart.data.datasets[0].data = outcomes;
    outcomesChart.data.labels = outcomesLabel;
    outcomesChart.update('active');


}


function NetHitsChartUpdate ( chart, numberOfDice, numberOfOpposedDice, successRate, maxNetHits) {

    var netHits = [];
    var netHitsLabel = [];
    // No net successes
    var prob = 0.0;
    for (var j = 0; j <= numberOfDice; j++) {
        var myProb = BinomTerm( successRate, numberOfDice, j );
        for (var k = 0; k <= numberOfOpposedDice; k++) {
            if (j - k <= 0) {
                var yourProb = BinomTerm( successRate, numberOfOpposedDice, k );
                prob = prob + myProb * yourProb;
            }
        }
    }
    netHits.push((prob * 100).toFixed(2));
    netHitsLabel.push('0');
    // One or more net successes
    for (var i = 1; i <= Math.min(numberOfDice, maxNetHits); i++) {
        prob = 0.0;
        for (var j = 0; j <= numberOfDice; j++) {
            var myProb = BinomTerm( successRate, numberOfDice, j );
            for (var k = 0; k <= numberOfOpposedDice; k++) {
                if (j - k >= i) {
                    var yourProb = BinomTerm( successRate, numberOfOpposedDice, k );
                    prob = (prob + myProb * yourProb);
                }
            }
        }
        probPercent = (prob * 100).toFixed(2);
        if (probPercent >= 0.1) {
            netHits.push(probPercent);
            netHitsLabel.push(String(i) + "+");

        }
        // netHits.push((prob * 100).toFixed(2));
    }
    
    //update and draw the new chart
    netHitsChart.data.datasets[0].data = netHits;
    netHitsChart.data.labels = netHitsLabel;
    netHitsChart.update('active');

}
