/**
 * Sanity Schema Registry — Pawmeals
 * All document types registered here appear in Sanity Studio.
 *
 * Singletons (one document per type):
 *   homepage, cateringPage, aboutPage, vetExclusivePage
 *
 * Collections (many documents):
 *   blogPost, pawrentingTip, vetArticle, faq, author
 */

import { homepage }         from "./homepage";
import { cateringPage }     from "./cateringPage";
import { aboutPage }        from "./aboutPage";
import { vetExclusivePage } from "./vetExclusive";
import { blogPost }         from "./blogPost";
import { pawrentingTip }    from "./pawrentingTip";
import { vetArticle }       from "./vetArticle";
import { faq }              from "./faq";
import { author }           from "./author";

export const schemaTypes = [
  // Singletons
  homepage,
  cateringPage,
  aboutPage,
  vetExclusivePage,

  // Collections
  blogPost,
  pawrentingTip,
  vetArticle,
  faq,
  author,
];
