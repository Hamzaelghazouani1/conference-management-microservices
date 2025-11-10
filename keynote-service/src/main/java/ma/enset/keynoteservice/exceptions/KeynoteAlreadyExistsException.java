package ma.enset.keynoteservice.exceptions;

public class KeynoteAlreadyExistsException extends RuntimeException {
    public KeynoteAlreadyExistsException(String message) {
        super(message);
    }
}

