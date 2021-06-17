# The question:

> You have n different biased coins, where each coin's probability p of flipping heads is drawn independently and uniformly from (0,1). Devise a scheme to generate the flip of fair coin as close to random as possible (i.e. as close to a 50-50 flip as possible). How many coin tosses would you need to be sure about getting a 50-50 flip?  
*Bonus mode: What if you didn't know that the probabilities were distributed at random? (200 words max)*

# Workings out

## Re-wording the question

you have `n` coins  
each coin has random probability of being heads between 0 and 1  
each coin's probabililty is uniformly selected from the range  

using the coins, how would you get as close to a 50/50 result as possible?  
how many coins flips would you need to be sure about getting a 50/50 result?  

what would you do if you couldn't be sure that the coin's probabilities were random?  

## Working

### First method

Knowing that the coin's probabilities are uniformly random between 0 and 1, then, on average, the mean probability of the coins will be 0.5.

Without knowing at least an estimate of the coins' individual probabilities, the closest to 50/50 random you can hope for is the mean probability of the coins. If you wanted to find an estimate for this mean probabililty, you could flip each coin `M` times (`M` being as large as practical), and then divide the total number of heads `H` by the number of flips, giving `H/(n*m)`. Hoping this mean probabililty is as close to 0.5 as possible, you could then flip all the coins and use whichever of heads or tails turns up most as the result. The larger `n` is, the closer to 0.5 the mean probability is, so the more coins in this case the better.

```py
import random

class Coin:
    def __init__(self, p=None):
        if p is None:
            p = 0
            while not (0 < p < 1):
                p = random.random()
        self.p = p
    
    def flip(self):
        return random.random() < self.p

n = 10
m = 1000
coins = [Coin() for i in range(n)]
flips1 = [coin.flip() for coin in coins]
flips2 = []
for coin in coins:
    for i in range(m):
        flips2.append(coin.flip())
mean_flip1 = sum(flips1) / n
mean_flip2 = sum(flips2) / (n*m)
mean_p = sum([coin.p for coin in coins]) / n
print(mean_p, mean_flip1, mean_flip2)
```

### Second method

If you wanted to find an estimate for each coin's individual probability, you could flip each one a large number of times (as many as practical) and again divide the number of heads by the number of flips, similar to before. With an estimate of each coin's probability, you could maybe perform a weighted mean or at least take into consideration the coins' probabilities unlike before.

You could actually achieve the results with just one coin. First find an estimate for the coin's probabililty `P` by again flipping `M1` times, and dividing the number of heads `H1` by it, giving `P` = `H1/M1`. Then flip the coin `M2` times (`M2` and `M1` both being as large as practical), recording the number of heads `H2`. The product of the coin's probability `P`, and a number of flips `M2`, is the number of expected heads, `P*M2`. This means:

The probability that *"the coin's probability `P`, multiplied by total number of flips `M2`,  is greater than the number of heads `H2`"* is 50/50.

Algebraically, this is `p(P*M2 > H2)` = 0.5 = `p((H1/M1)*M2 > H2)`. This is a generalisation of the first method, in that before you were hoping that the mean probability of the coins was 0.5, due to the fact that the probabilities were uniform. As you hoped the mean probability to be 0.5, you would then expect the average number of heads to be half of the total flips, which is why the result is whichever of heads or tails there were more of. However now, we have *calculated* an estimate for the probability, which means we have a more accurate number of how many heads to expect.

### Third method

If we then assume then that `M1` = `M2`, then `p((H1/M1)*M2 > H2)` = `p(H1 > H2)` = 0.5. This simplification makes seems sensible enough and simplifies the process, allowing us to simply compare which of two sets of flips had the greater number of heads.

You could use either ">" or "<" in the comparison, since the probability is 0.5. What about using the 'equal to' variants ("≥" or "≤")? Either way, whichever direction you choose it means that the probability would be skewed slightly either way, so to counterract this any result where `H1` = `H2` should be ignored. This means the 'equal to' variants would also not have any affect.

So to use this method:

> Pick one coin, and flip it `M` times twice (`M` being as large as practical), recording the number of heads each time as `H1` and `H2`. If `H1` = `H2`, then re-flip `M` times for `H1` or `H2`.The probability that `H1` > `H2` is 0.5.

When performing this consecutively, for non-independent results re-flip one of `H1` and `H2`. For independent results re-calculate both.

I think there's no way to guarantee exactly 0.5 due to the coin's probability `P` being an estimate. I doubt even `M` = infinity would guarantee it, since the coin is theoretically truly random.

This works for the "Bonus mode" too, as you only use one coin, so not knowing that the probabilities were randomly distributed doesn't matter.

```py
import random

class Coin:
    def __init__(self, p=None):
        if p is None:
            p = 0
            while not (0 < p < 1):
                p = random.random()
        self.p = p
    
    def flip(self):
        return random.random() < self.p

n = _n = 100000
m = 10
c = Coin()
gt = 0
while _n > 0:
    h1 = sum([c.flip() for i in range(m)])
    h2 = sum([c.flip() for i in range(m)])
    if h1 == h2:
        continue
    elif h1 > h2:
        gt += 1
    _n -= 1
print(gt/n)
```

### Fourth method

What I said before about it being impossible to guarantee 0.5 odds, I think is wrong. This is because my reasoning was based off of `P`, however in that method I had cancelled out and removed `P` altogether, so its affect may not apply any more.

Due to this, I think any number of flips should give 0.5 odds, meaning that `M` no longer has to be as large as possible. I reckon the only effect of increasing `M` will be decreasing the chances of getting an equal number of flips both times, meaning you'll have to re-flip fewer times. Even if this is true however, using a smaller `M` is still preferential as it'll still take less time to re-flip with a smaller `M` than to flip many more times. Maybe you can repeatedly flip for each "side" one at a time until they're not equal?

The minimum number of flips is probabily `M` = 2, as then if you first get 1, the second lot has a chance of being higher and lower. Maybe it would also work with `M` = 1 though? Yes! Now the scheme is as follows:

> Pick one coin and flip it twice. If the both flips were the same, keep re-flipping twice until they're different. The odds of getting heads-then-tails to tails-then-heads is 50-50.

We can confirm this with a probability tree, where the coin's probability is `P` and `M` = 1:

```
├─ H
│   ├─ H = P²
│   └─ T = P(1-P)
└─ T
   ├─ H = P(1-P)
   └─ T = (1-P)²
```

Getting `HH` or `TT` results in an invalid flip, so those outcomes can be ignored. So getting `HT` and `TH` then have equal chances, resulting in 50-50.

For `M` = 1, by plotting a graph of `y = x^2 + (1-x)^2 = 2x^2 - 2x + 1`, you can see what the chances of getting two equal flips are, depending on `P`. Resulting in a quadratic going through (0, 1), (0.5, 0.5) and (1, 1), its clear that the closer to 0.5 the coin's probability is, the less likely it is to have equal flips (only half the time), whereas closer to 0 or 1 the chances of equal flips increases, tending towards 100% of the time.

| x | f(x) |
------|---------
0   | 1
0.1 | 0.82
0.2 | 0.68
0.3 | 0.58
0.4 | 0.52
0.5 | 0.5
0.6 | 0.52
0.7 | 0.58
0.8 | 0.68
0.9 | 0.82
1   | 1

This means that, for example, on average, for a coin with `P` = 0.1, every 1/5 attemps will be successful. The average value of the `y = 2x^2 - 2x + 1` graph between 0 and 1, from some quick integration (`2/3x^3 - x^2 + x`), is 2/3, meaning that on average 2/3's of attemps will fail, or every 1 in 3 attemps will result in a valid outcome. Due to this, if you end up picking a coin with a `P` value very near 0 or 1, you could be stuck re-flipping a fair bit, so its best to pick a new coin if you're re-flipping a lot (or just everytime you get an invalid pair of flips).

This makes the new scheme:

> Pick a coin and keep flipping it twice until you get one heads and one tails (if possible, use a new coin for each try). Once done, the chance of heads having been the first of the two flips is 50%.

What about the affect of `M`? If we assume `P` = 0.5, then `y = Pⁿ + (1-P)ⁿ` results in a graph which is *ridiculously* close to `y = 2e^(-0.7x)`. Looks like it makes sense:

```
0.5^x + (1-0.5)^x ≈ 2e^(-0.7x)
    0.5^x + 0.5^x ≈ 2e^(-0.7x)
          2*0.5^x ≈ 2e^(-0.7x)
            0.5^x ≈ e^(-0.7x)
        ln(0.5^x) ≈ -0.7x
        x*ln(0.5) ≈ -0.7x
            ln(2) ≈ 0.7
```

Which is true! Thats cool.

# Solution

Pick a coin and keep flipping it twice until you get one heads and one tails (if possible, use a new coin for each try). Once done, the chance of heads having been the first of the two flips is 50%.

On valid pairs of flips (one heads and one tails), it takes exactly 2 flips to get a guaranteed 50-50 result.

On average you'll get a valid pair of flips every 1 in 3 times. 

This works for the "Bonus mode" as you only need one coin, so any information about distribution doesn't matter.