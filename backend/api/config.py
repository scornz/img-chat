from os import environ
from os.path import exists

DEFAULT_PARAMS = "?retryWrites=true&w=majority"


class Config(object):
    """Base config, takes all parameters."""

    def __init__(self, use_srv=False, db_params=DEFAULT_PARAMS):
        # Whether or not to use DNS SRV, needed for URI
        self.USE_SRV = use_srv
        # Essential information to connect to database
        self.DB_HOST = environ.get("DB_HOST")
        self.DB_USER = environ.get("DB_USER")
        self.DB_PASSWORD = environ.get("DB_PASSWORD")
        self.DB_NAME = environ.get("DB_NAME")
        # Additional parameters for MongoDB requests
        # retryWrites will retry post requests if the first one fails
        self.DB_PARAMS = db_params

        # Prevent MongoDB from autoconnecting, needs to connect after
        # creating parralel process
        self.MONGODB_CONNECT = False

    @property
    def MONGODB_SETTINGS(self):  # Note: all caps
        # Add +srv iff use_srv is true
        srv_str = "+srv" if self.USE_SRV else ""
        uri = (
            f"mongodb{srv_str}://"
            f"{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}/{self.DB_NAME}{self.DB_PARAMS}"
        )

        import certifi

        # Manually specify TLS certificate locations
        ca = certifi.where()
        return {"host": uri, "tlsCAFile": ca, "connect": False}
