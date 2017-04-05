package com.theironyard.novauc.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.theironyard.novauc.domain.Items;

import com.theironyard.novauc.repository.ItemsRepository;
import com.theironyard.novauc.web.rest.util.HeaderUtil;
import com.theironyard.novauc.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Items.
 */
@RestController
@RequestMapping("/api")
public class ItemsResource {

    private final Logger log = LoggerFactory.getLogger(ItemsResource.class);

    private static final String ENTITY_NAME = "items";
        
    private final ItemsRepository itemsRepository;

    public ItemsResource(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    /**
     * POST  /items : Create a new items.
     *
     * @param items the items to create
     * @return the ResponseEntity with status 201 (Created) and with body the new items, or with status 400 (Bad Request) if the items has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/items")
    @Timed
    public ResponseEntity<Items> createItems(@RequestBody Items items) throws URISyntaxException {
        log.debug("REST request to save Items : {}", items);
        if (items.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new items cannot already have an ID")).body(null);
        }
        Items result = itemsRepository.save(items);
        return ResponseEntity.created(new URI("/api/items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /items : Updates an existing items.
     *
     * @param items the items to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated items,
     * or with status 400 (Bad Request) if the items is not valid,
     * or with status 500 (Internal Server Error) if the items couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/items")
    @Timed
    public ResponseEntity<Items> updateItems(@RequestBody Items items) throws URISyntaxException {
        log.debug("REST request to update Items : {}", items);
        if (items.getId() == null) {
            return createItems(items);
        }
        Items result = itemsRepository.save(items);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, items.getId().toString()))
            .body(result);
    }

    /**
     * GET  /items : get all the items.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of items in body
     */
    @GetMapping("/items")
    @Timed
    public ResponseEntity<List<Items>> getAllItems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Items");
        Page<Items> page = itemsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /items/:id : get the "id" items.
     *
     * @param id the id of the items to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the items, or with status 404 (Not Found)
     */
    @GetMapping("/items/{id}")
    @Timed
    public ResponseEntity<Items> getItems(@PathVariable Long id) {
        log.debug("REST request to get Items : {}", id);
        Items items = itemsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(items));
    }

    /**
     * DELETE  /items/:id : delete the "id" items.
     *
     * @param id the id of the items to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/items/{id}")
    @Timed
    public ResponseEntity<Void> deleteItems(@PathVariable Long id) {
        log.debug("REST request to delete Items : {}", id);
        itemsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
