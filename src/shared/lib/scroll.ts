export function scrollToElementByIdWithOffset(id: string, offset = 0) {
	const element = document.getElementById(id)
	if (!element) return
	const y = element.getBoundingClientRect().top + window.pageYOffset + offset
	window.scrollTo({ top: y, behavior: 'smooth' })
}


