# In-memory user store — pre-written, nothing to change here
# Key:   email (str)
# Value: dict with email, hashed_password, and role
users: dict[str, dict] = {}
