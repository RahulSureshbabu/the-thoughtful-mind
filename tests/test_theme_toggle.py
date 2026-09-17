from playwright.sync_api import Page, expect


def test_theme_toggle_switches_and_persists(page: Page, base_url: str):
    page.goto(f"{base_url}/")

    html = page.locator("html")
    initial_theme = html.get_attribute("data-theme")
    assert initial_theme in ("light", "dark")

    page.get_by_role("button", name="Alternar modo escuro").click()
    expected_theme = "dark" if initial_theme == "light" else "light"
    expect(html).to_have_attribute("data-theme", expected_theme)

    page.reload()
    expect(html).to_have_attribute("data-theme", expected_theme)
