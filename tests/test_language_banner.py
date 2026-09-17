from playwright.sync_api import expect


def test_language_banner_shown_for_non_english_locale(browser, base_url: str):
    # The homepage doesn't restrict available locales to a specific post's
    # translations, so any supported non-English browser locale should
    # trigger the banner there.
    context = browser.new_context(locale="es-ES")
    page = context.new_page()
    try:
        page.goto(f"{base_url}/")

        banner = page.locator("#language-banner")
        expect(banner).to_be_visible()
        expect(banner).to_contain_text("Español")

        page.get_by_role("button", name="Dismiss").click()
        expect(banner).to_be_hidden()

        page.reload()
        expect(banner).to_be_hidden()
    finally:
        context.close()


def test_language_banner_not_shown_for_english_locale(browser, base_url: str):
    context = browser.new_context(locale="en-US")
    page = context.new_page()
    try:
        page.goto(f"{base_url}/")
        expect(page.locator("#language-banner")).to_be_hidden()
    finally:
        context.close()
