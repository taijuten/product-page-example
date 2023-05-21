# SOLUTION

## Estimation
----------
Estimated: 9 hours

Spent: 8 hours 35 mins

For further context on this, please see the [project board](https://github.com/taijuten/product-page-example/projects?query=is%3Aopen)

## Solution
--------
### Implementation

I broke the Acceptance Criteria down into vertical slices. Each of the stories can be seen on the aforementioned project board.
For each pull request into `main`, I have taken a screenshot of the page at that time, to show the development iterations.

In addition, [a basic CI was implemented](https://github.com/taijuten/product-page-example/actions) to validate changes.

Bootstrap was used as a quick way to implement a basic design language, as I deemed it unlikely you'd be judging this based off my design skills, but rather how I implement the technical aspects. For this, using an off-the-shelf design language was the most efficient option.

### Edge cases & Unknowns

There were a couple of parts that were unclear, and which I have had to make assumptions on.

#### Subscription Discount

This is returned as an integer from the API, and so it was unclear whether this should be a percentage or flat discount on the price. Due to the consistent discount value among varied prices, I've assumed this is a percentage rate.

#### Subscription Filter Requirements

The A/C for the Subscription Filter did not specify the behaviour for when the filter was off. Either no subscription items would show, or all items. I've assumed the latter.

### Out of Scope

#### Enhanced Error Handling
Currently there is very basic error handling implemented, so that if an error is returned by the API the user is advised.

I would normally extend further upon this using Error Boundaries to contain errors, and give a better user experience.

#### Memoization
Each Functional Component is quite basic for now, but there is further scope for performance enhancements by using memoization, and perhaps event caching search results on the client to prevent extraneous API requests.

#### Local Storage Persistence
It can be a good idea to persist search parameters for the user, so that the same parameters are selected when they return to the site. This can be done with localstorage or cookies as desired.

#### Component Library / Design Language
As mentioned in the Implementation section, I've opted for Bootstrap for this implementation. However, as the application grows, I would opt for having a Component Library where all the business design language can be declared, allowing re-usable components for a consistent design & behaviour across the site.

#### E2E / Integration testing with Cypress
Where I've used React Testing Library for the tests, I would also expand upon this by using a tool like [Cypress](https://www.cypress.io/) to test the Gherkin test cases at a higher level. I would usually recommend doing this as an integration test approach with stubbed API, and having independent API tests.

### Future Improvements

#### Server side rendering

For performance and SEO benefits, I would opt for server-side / isomorphic rendering where possible.
Using a tool such as NextJS or Gatsby would enable this out of the box.

#### Structured data / SEO

Due to the e-commerce nature of the application, I would further iterate upon the components and component library to ensure that [Structured Data](https://developers.google.com/search/docs/appearance/structured-data/product#microdata_2) is used, ensuring that the products are more easily processed by Google, and giving another avenue for product discovery.

#### Fuzzy searching / recommendations API

I would use a third party or opensource tool for searching and filtering. I've had good experiences with [algolia](https://www.algolia.com/?utm_source=google&utm_medium=paid_search&utm_campaign=rl_emea_search_brand&utm_content=algolia&utm_term=algolia&utm_region=emea&utm_model=brand&utm_ag=rl&_bt=607886001247&_bm=e&_bn=g&gad=1&gclid=CjwKCAjwgqejBhBAEiwAuWHioAnWcG7zcJfESeIaRJuQNt3IpKpm0WcfMD_CtIV-A6XOjCERaik9pRoCgGoQAvD_BwE) before, which would also allow usage of a recommendation API based on individual users. The benefits of this vary depending on the size of the product catalogue.

#### Filters based on pet rather than product (e.g. type, age)

It may be beneficial to have a user-based filter rather than product-based filter. Instead allowing users to filter on what type of pet they have, by type, age, size etc. Persisting these filters is then particularly useful for individual users.

#### Tag filters

Tags are implemented, but being able to filter on these tags by clicking them would be a quick win for product discovery.

#### CD & Sonarcloud

I would further flesh out the CI / CD, and also implement code quality checking with a tool such as [Sonarcloud](https://www.sonarsource.com/products/sonarcloud/?gads_campaign=SC-Class02-Brand&gads_ad_group=SonarCloud&gads_keyword=sonarcloud&gclid=CjwKCAjwgqejBhBAEiwAuWHioDXxVW2O0AAd5kbtn1-yc8elrwSTF-o1Dz2AGrkeFrI12uV6AieY3hoC1fkQAvD_BwE).

#### Analytics / Mixpanel / Fullstory

Many of the stories should have user goals where success is measured by improvements in metrics or other data. To fully succeed in this I would implement [Google Analytics](https://analytics.google.com/analytics/web/) / [Tag Manager](https://tagmanager.google.com/), [MixPanel](https://mixpanel.com/) and perhaps user flow recording tools like [Full Story](https://www.fullstory.com/).

This would help ensure that each iteration gives a measureable improvement to the end user.

#### Ability to favourite / share items

Social sharing is another great avenue for finding users. Allowing our users to easily share a link to a product with social buttons may be beneficial.

#### Workspaces / monorepo

During the interview it was discussed that several independent applications were being combined. Following this, it's a safe assumption that this repository would grow over time to be supported by multiple developers and perhaps teams.

One good way to ensure that the teams have sharable and consistent code is to use workspaces or a monorepo.

This also can help prevent CI/CD being bogged down as a repository grows, by only running checks against affected code.