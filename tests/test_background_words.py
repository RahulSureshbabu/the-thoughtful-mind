import re

from playwright.sync_api import Page, expect


def test_background_layer_is_decorative_and_non_interactive(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    layer = page.locator(".bg-words")
    expect(layer).to_have_attribute("aria-hidden", "true")
    expect(layer).to_have_css("pointer-events", "none")


def test_words_are_painted_by_css_not_page_text(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    layer = page.locator(".bg-words")
    expect(layer).to_have_attribute("data-text", re.compile("Memória"))
    # Nothing in the DOM for find-in-page, selection or crawlers to pick up.
    expect(layer).to_have_text("")
    expect(page.get_by_text("Memória", exact=True)).to_have_count(0)


def test_words_follow_the_page_language(page: Page, base_url: str):
    page.goto(f"{base_url}/en/")

    expect(page.locator(".bg-words")).to_have_attribute("data-text", re.compile("Memory"))


def test_multi_word_terms_are_not_split_across_lines(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    expect(page.locator(".bg-words")).to_have_attribute("data-text", re.compile("Dissonância cognitiva"))


def test_spotlight_follows_the_cursor(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    layer = page.locator(".bg-words")
    expect(layer).to_have_attribute("data-text", re.compile("."))
    expect(layer).not_to_have_class(re.compile("is-active"))

    page.mouse.move(400, 300)
    expect(layer).to_have_class(re.compile("is-active"))
    expect(layer).to_have_attribute("style", re.compile(r"--mx:\s*400px"))
    expect(layer).to_have_attribute("style", re.compile(r"--my:\s*300px"))

    page.evaluate("document.documentElement.dispatchEvent(new MouseEvent('mouseleave'))")
    expect(layer).not_to_have_class(re.compile("is-active"))


def test_layer_does_not_block_clicks_on_the_page(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    page.get_by_role("navigation", name="Primary").get_by_role("link", name="Sobre").click()
    expect(page).to_have_url(re.compile(r"/about/$"))


def test_hidden_on_touch_devices(browser, base_url: str):
    context = browser.new_context(has_touch=True, is_mobile=True, viewport={"width": 390, "height": 844})
    page = context.new_page()
    try:
        page.goto(f"{base_url}/")
        layer = page.locator(".bg-words")
        expect(layer).to_be_hidden()
        # No hover on touch, so the field is never even generated.
        assert layer.get_attribute("data-text") is None
    finally:
        context.close()
