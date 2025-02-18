```markdown
# Introduction

The v2 Post counts endpoints allow developers to understand and retrieve the volume of data for a given query. This can be beneficial for a number of reasons, including:

- Understanding the Post volume for a keyword to build visualizations, such as trendlines.
- Understanding the time period in which an event or conversation occurred, to ensure your query captures the relevant data.
- Understanding how many Posts a search query will return, in order to refine your query before using the recent search or full-archive search endpoints. **Please note:** The counts will not always match the results that will be returned from search endpoints because the search endpoints go through additional compliance that the counts endpoints do not.
- Understanding the size of the conversation around a topic, without actually having to pull the raw data, and put Posts against your monthly Post cap.

When developing a query, you will be limited to a certain query length and to specific operators based on your access level.

- If you are using a Project with Pro access, you can use all available operators and use queries up to 1024 characters in length.
- If you are using a Project with Enterprise access, you can use all available operators and use queries up to 4096 characters in length.

You can also specify the granularity (which can be day, hour, or minute) as well as the time period for which you need the Post counts (using the `start_time` and `end_time` parameters). The default time granularity that this endpoint uses is hour, which means if you do not specify the granularity parameter, the endpoint will give you the Post counts per hour for the last 7 days.

## Account Setup

To access these endpoints, you will need:
- An approved developer account.
- To authenticate using the keys and tokens from a developer App that is located within a Project. 

Learn more about getting access to the X API v2 endpoints in our getting started guide.

## Recent Post Counts

The recent Post counts endpoint allows you to programmatically retrieve the numerical count of Posts for a query over the last seven days. This endpoint is available to anyone using keys and tokens that are associated with an App within a Project and uses OAuth 2.0 App-Only for authentication.

## Full-Archive Post Counts

**Academic Research or Enterprise access only**

The full-archive Post counts endpoint allows you to programmatically retrieve the numerical count of Posts for a query from the entire archive of public Posts. Currently, this endpoint is only available to those that have been approved for Academic Research or Enterprise access and use OAuth 2.0 App-Only for authentication.

One example: You could use the full-archive Post counts endpoint to see the number of Posts for the hashtag `#SOSHurricaneHarvey` per day between August and September 2017.

**Please note:** The counts endpoint paginates at 31 days per response. For example, setting a day granularity will return the count of results per day for 31 days per page. Setting an hour granularity will return the count of results per hour for 744 (31 days x 24 hours) hours per page. If you do not specify the granularity and time period, this endpoint will give you Post counts for a query per hour for the last 30 days.
```
