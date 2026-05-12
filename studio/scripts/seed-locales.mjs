import {getCliClient} from 'sanity/cli'

const dryRun = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2025-05-07'})

const SINGLETONS = ['homepage', 'aboutPage', 'cateringPage', 'vetExclusivePage']
const LOCALES = ['id', 'en']
const OMITTED_FIELDS = new Set(['_createdAt', '_updatedAt', '_rev'])

const cloneForLocale = (document, locale) => {
  const localized = {}

  for (const [key, value] of Object.entries(document)) {
    if (!OMITTED_FIELDS.has(key)) {
      localized[key] = value
    }
  }

  localized._id = `${document._type}__${locale}`
  localized.language = locale

  return localized
}

for (const type of SINGLETONS) {
  const sourceDocument = await client.getDocument(type)

  if (!sourceDocument) {
    console.log(`Skipped ${type}: source document '${type}' was not found`)
    continue
  }

  for (const locale of LOCALES) {
    const localizedDocument = cloneForLocale(sourceDocument, locale)

    if (dryRun) {
      console.log(`DRY RUN: would create or replace ${localizedDocument._id}`)
      continue
    }

    await client.createOrReplace(localizedDocument)
    console.log(`Seeded ${localizedDocument._id}`)
  }
}

if (dryRun) {
  console.log('Locale seed dry-run completed without mutations')
}
