import Link from "@mui/material/Link";

const GOOGLE_SEARCH_PREFIX = "https://www.google.com/search?q=";

function getAnnotatedPairs(text, ents) {
  let i = 0;
  let parts = [];
  while (i < text.length) {
    let minJ = undefined;
    let minEnt = undefined;
    for (let ent of ents) {
      const needle = ent.text;
      const j = text.indexOf(needle, i);
      if (j !== -1) {
        if (minJ === undefined || j < minJ) {
          minJ = j;
          minEnt = ent;
        }
      }
    }

    if (minJ !== undefined) {
      parts.push([text.substring(i, minJ), false]);
      parts.push([minEnt.text, minEnt.label]);
      i = minJ + minEnt.text.length;
    } else {
      parts.push([text.substring(i), false]);
      break;
    }
  }
  return parts;
}

const STYLE_REGULAR = {
  opacity: 0.6,
};

const STYLE_ENT_THING = {
  fontWeight: "bold",
};

const STYLE_ENT_NUMBER = {
  fontWeight: "bold",
  opacity: 0.8,
};

const STYLE_LINK = {
  textDecoration: "none",
  color: "inherit",
};

export default function HighlightEnts({ text, ents }) {
  if (!ents) {
    return text;
  }

  const annotatedPairs = getAnnotatedPairs(text, ents);
  return annotatedPairs.map(function ([text, entLabel], iItem) {
    const key = "item-" + iItem + text;
    if (entLabel === false) {
      return (
        <span key={key} style={STYLE_REGULAR}>
          {text}
        </span>
      );
    }

    let style;
    if (
      [
        "CARDINAL",
        "DATE",
        "MONEY",
        "ORDINAL",
        "PERCENT",
        "QUANTITY",
        "TIME",
      ].includes(entLabel)
    ) {
      style = STYLE_ENT_NUMBER;
    } else if (
      [
        "EVENT",
        "FAC",
        "GPE",
        "LAW",
        "LOC",
        "NORP",
        "ORG",
        "PERSON",
        "PRODUCT",
        "WORK_OF_ART",
      ].includes(entLabel)
    ) {
      style = STYLE_ENT_THING;
    } else {
      console.debug(entLabel, text);
      style = STYLE_ENT_THING;
    }

    const href = GOOGLE_SEARCH_PREFIX + encodeURIComponent(text);

    return (
      <Link key={key} href={href} style={STYLE_LINK} target="_blank">
        <span style={style}>{text}</span>
      </Link>
    );
  });
}
