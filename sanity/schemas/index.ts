/**
 * Sanity Schema Registry — Pawmeals
 * All document types registered here appear in Sanity Studio.
 *
 * Singletons (one document per type):
 *   homepage, cateringPage, aboutPage, vetExclusivePage
 *
 * Collections (many documents):
 *   blogPost, pawrentingTip, vetArticle, faq, author, productCategory,
 *   product, quizQuestion, quizResult
 */

import { homepage }         from "./homepage";
import { cateringPage }     from "./cateringPage";
import { aboutPage }        from "./aboutPage";
import { vetExclusivePage } from "./vetExclusive";
import { siteSettings }     from "./siteSettings";
import { blogPost }         from "./blogPost";
import { pawrentingTip }    from "./pawrentingTip";
import { vetArticle }       from "./vetArticle";
import { faq }              from "./faq";
import { author }           from "./author";
import { productCategory }  from "./productCategory";
import { product }          from "./product";
import { quizQuestion }     from "./quizQuestion";
import { quizResult }       from "./quizResult";

export const schemaTypes = [
  // Singletons
  homepage,
  cateringPage,
  aboutPage,
  vetExclusivePage,
  siteSettings,

  // Collections
  blogPost,
  pawrentingTip,
  vetArticle,
  faq,
  author,
  productCategory,
  product,
  quizQuestion,
  quizResult,
];
