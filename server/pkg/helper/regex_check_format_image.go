package helper

import "regexp"

func RegexCheckFormatImage(input string) bool {
	formatted := []string{
		"https://content.rolex.com/dam/2022-11/upright-cc/",
		"https://media.richardmille.com/wp-content/uploads/",
		"https://static.patek.com/images/articles/face_white/",
		"https://www.danielwellington.com/product-images/",
	}

	for _, v := range formatted {
		re := regexp.MustCompile(v + ".*")
		if re.MatchString(input) {
			return true
		}
	}

	return false
}
